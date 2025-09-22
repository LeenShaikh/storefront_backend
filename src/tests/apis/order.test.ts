import request from "supertest";
import app from "../../app.js";
import { describe, it, expect } from "vitest";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsZWVuQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU4NDU5NzAxLCJleHAiOjE3NTg0NjY5MDF9.jCeVlsw2LGNHuWbjXE0_8R78KarHWz4jnazlkKVlM0A";

describe("Order API tests", () => {
  it("should get all orders", async () => {
    const res = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should get order by id", async () => {
    const res = await request(app)
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("should create a new order", async () => {
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: 1, status: "active" });
    expect(res.status).toBe(201);
  });
});
