import pool from '../database.js';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class UserModel {
  async create(user: User): Promise<User> {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const result = await pool.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4) RETURNING *',
    [user.first_name, user.last_name, user.email, hashedPassword]
  );
  return result.rows[0];
}


  async getAll(): Promise<User[]> {
    const result = await pool.query('SELECT id, first_name, last_name, email FROM users');
    return result.rows;
  }

  async getById(id: number): Promise<User | null> {
    const result = await pool.query('SELECT id, first_name, last_name, email FROM users WHERE id=$1', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
  const result = await pool.query(
    'UPDATE users SET first_name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING *',
    [user.first_name, user.last_name, user.email, id]
  );
  return result.rows[0];
}

async delete(id: number): Promise<User> {
  const result = await pool.query(
    'DELETE FROM users WHERE id=$1 RETURNING *',
    [id]
  );
  return result.rows[0];
}



  async authenticate(email: string, password: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
