import pool from '../database.js';
export type Product = {
  id?: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
};

export class ProductModel {
  async create(product: Product): Promise<Product> {
    const result = await pool.query(
      'INSERT INTO products (name, price, description, category) VALUES ($1,$2,$3,$4) RETURNING *',
      [product.name, product.price, product.description, product.category]
    );
    return result.rows[0];
  }

  async getAll(): Promise<Product[]> {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  }

  async getById(id: number): Promise<Product | null> {
    const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const result = await pool.query(
      'UPDATE products SET name=$1, price=$2, description=$3, category=$4 WHERE id=$5 RETURNING *',
      [product.name, product.price, product.description, product.category, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
  }
}
