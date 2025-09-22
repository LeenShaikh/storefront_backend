import request from "supertest";
import app from "../../app.js";
import { describe, it, expect } from "vitest";

describe("Auth API tests", () => {
  it("should login successfully and return a token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "leen@example.com",
        password: "123456",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
