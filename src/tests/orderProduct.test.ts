import request from "supertest";
import app from "../app.js";
import { describe, it, expect } from "vitest";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsZWVuQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU4NDU5NzAxLCJleHAiOjE3NTg0NjY5MDF9.jCeVlsw2LGNHuWbjXE0_8R78KarHWz4jnazlkKVlM0A";

describe("OrderProduct API tests", () => {
  it("should get all order-products", async () => {
    const res = await request(app)
      .get("/order-products")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should get order-product by id", async () => {
    const res = await request(app)
      .get("/order-products/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should create a new order-product", async () => {
    const res = await request(app)
      .post("/order-products")
      .set("Authorization", `Bearer ${token}`)
      .send({ order_id: 1, product_id: 1, quantity: 5 });
    expect(res.status).toBe(201);
  });
});
