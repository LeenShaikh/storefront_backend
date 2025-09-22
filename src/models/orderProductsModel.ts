import pool from '../database.js';

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity?: number;
};

export class OrderProductModel {
  async create(op: OrderProduct): Promise<OrderProduct> {
    const result = await pool.query(
      'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *',
      [op.order_id, op.product_id, op.quantity || 1]
    );
    return result.rows[0];
  }

  async getAll(): Promise<OrderProduct[]> {
    const result = await pool.query('SELECT * FROM order_products');
    return result.rows;
  }

  async getById(id: number): Promise<OrderProduct | null> {
    const result = await pool.query('SELECT * FROM order_products WHERE id=$1', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, op: Partial<OrderProduct>): Promise<OrderProduct> {
  const current = await this.getById(id);
  if (!current) throw new Error('OrderProduct not found');

  const updated = await pool.query(
    'UPDATE order_products SET order_id=$1, product_id=$2, quantity=$3 WHERE id=$4 RETURNING *',
    [
      op.order_id ?? current.order_id,
      op.product_id ?? current.product_id,
      op.quantity ?? current.quantity,
      id
    ]
  );
  return updated.rows[0];
}


  async delete(id: number): Promise<OrderProduct> {
    const current = await this.getById(id);
    if (!current) throw new Error('OrderProduct not found');
    const result = await pool.query('DELETE FROM order_products WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
  }
}
