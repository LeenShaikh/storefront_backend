import { describe, it, expect, beforeEach, afterAll } from "vitest";
import pool from "../../database.js";
import { UserModel } from "../../models/userModel.js";
import { ProductModel } from "../../models/productModel.js";
import { OrderModel } from "../../models/orderModel.js";
import { OrderProductModel } from "../../models/orderProductsModel.js";

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const orderProductModel = new OrderProductModel();

describe('OrderProductModel', () => {
  let userId: number;
  let orderId: number;
  let productId: number;

  beforeEach(async () => {
    await pool.query("TRUNCATE order_products, orders, products, users CASCADE");

    const user = await userModel.create({
      first_name: 'Test',
      last_name: 'User',
      email: `testuser${Date.now()}@example.com`,
      password: 'password123'
    });
    userId = user.id!;

    const order = await orderModel.create({
      user_id: userId,
      status: 'active'
    });
    orderId = order.id!;

    const product = await productModel.create({
      name: 'Test Product',
      price: 50
    });
    productId = product.id!;
  });

  afterAll(async () => {
    await pool.query("TRUNCATE order_products, orders, products, users CASCADE");
    await pool.end();
  });

  it('should create a new order_product', async () => {
    const orderProduct = await orderProductModel.create({
      order_id: orderId,
      product_id: productId,
      quantity: 5
    });

    expect(orderProduct).toBeDefined();
    expect(orderProduct.id).toBeDefined();
    expect(orderProduct.quantity).toBe(5);
  });

  it('should return all order_products', async () => {
    await orderProductModel.create({ order_id: orderId, product_id: productId, quantity: 2 });

    const result = await orderProductModel.getAll();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return order_product by ID', async () => {
    const orderProduct = await orderProductModel.create({ order_id: orderId, product_id: productId, quantity: 3 });

    const result = await orderProductModel.getById(orderProduct.id!);
    expect(result).toBeDefined();
    expect(result?.id).toBe(orderProduct.id);
  });

  it('should update an order_product', async () => {
    const orderProduct = await orderProductModel.create({ order_id: orderId, product_id: productId, quantity: 3 });

    const updated = await orderProductModel.update(orderProduct.id!, { quantity: 10 });
    expect(updated).toBeDefined();
    expect(updated.quantity).toBe(10);
  });

  it('should delete an order_product', async () => {
    const orderProduct = await orderProductModel.create({ order_id: orderId, product_id: productId, quantity: 4 });

    const deleted = await orderProductModel.delete(orderProduct.id!);
    expect(deleted).toBeDefined();
    expect(deleted.id).toBe(orderProduct.id);

    const check = await orderProductModel.getById(orderProduct.id!);
    expect(check).toBeNull();
  });
});
