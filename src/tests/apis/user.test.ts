import request from "supertest";
import app from "../../app.js";
import { describe, it, expect } from "vitest";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsZWVuQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU4NDU5NzAxLCJleHAiOjE3NTg0NjY5MDF9.jCeVlsw2LGNHuWbjXE0_8R78KarHWz4jnazlkKVlM0A";

describe("User API tests", () => {
  it("should get all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a user by id", async () => {
    const res = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should create a new user", async () => {
  const res = await request(app)
    .post("/users/signup") 
    .send({
      first_name: "lama",
      last_name: "ali",
      email: `lama${Date.now()}@example.com`,
      password: "123456",
    });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("id");
});

});
