import { describe, it, expect, beforeAll, afterAll } from "vitest";
import pool from "../../database.js";
import { OrderModel } from "../../models/orderModel.js";
import { UserModel } from "../../models/userModel.js";

const orderModel = new OrderModel();
const userModel = new UserModel();
let orderId: number;
let userId: number;

describe("OrderModel", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM orders");
    await pool.query("DELETE FROM users");

    const user = await userModel.create({
      first_name: "Test",
      last_name: "User",
      email: `user${Date.now()}@example.com`,
      password: "123456",
    });
    userId = user.id as number;
  });

  afterAll(async () => {
    await pool.query("DELETE FROM orders");
    await pool.query("DELETE FROM users");
    await pool.end();
  });

  it("should create a new order", async () => {
    const order = await orderModel.create({ user_id: userId });
    expect(order).toHaveProperty("id");
    orderId = order.id as number;
  });

  it("should return all orders", async () => {
    const orders = await orderModel.getAll();
    expect(orders.length).toBeGreaterThan(0);
  });

  it("should return order by ID", async () => {
    const order = await orderModel.getById(orderId);
    expect(order?.id).toBe(orderId);
    expect(order?.user_id).toBe(userId);
  });

  it("should update an order status", async () => {
    const updated = await orderModel.update(orderId, { status: "completed" });
    expect(updated.status).toBe("completed");
  });

  it("should delete an order", async () => {
    await orderModel.delete(orderId);
    const order = await orderModel.getById(orderId);
    expect(order).toBeNull();
  });
});
