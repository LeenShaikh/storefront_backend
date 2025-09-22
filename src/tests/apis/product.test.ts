import request from "supertest";
import app from "../../app.js";
import { describe, it, expect } from "vitest";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsZWVuQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU4NDU5NzAxLCJleHAiOjE3NTg0NjY5MDF9.jCeVlsw2LGNHuWbjXE0_8R78KarHWz4jnazlkKVlM0A";

describe("Product API tests", () => {
  it("should get all products", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get product by id", async () => {
    const res = await request(app).get("/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should create a new product", async () => {
    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Apple", price: 2, stock: 50 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});
