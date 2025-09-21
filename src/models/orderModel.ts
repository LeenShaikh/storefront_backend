import pool from '../database.js';

export type Order = {
  id?: number;
  user_id: number;
  status?: string;
  created_at?: Date;
};

export class OrderModel {
  async create(order: Order): Promise<Order> {
    const result = await pool.query(
      'INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *',
      [order.user_id, order.status || 'active']
    );
    return result.rows[0];
  }

  async getAll(): Promise<Order[]> {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
  }

  async getById(id: number): Promise<Order | null> {
    const result = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    const result = await pool.query(
      'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *',
      [order.status, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM orders WHERE id=$1', [id]);
  }
}
