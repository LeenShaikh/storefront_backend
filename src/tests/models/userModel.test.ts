import { describe, it, expect, beforeAll, afterAll } from "vitest";
import pool from "../../database.js";
import { UserModel } from "../../models/userModel.js";
import type { User } from "../../models/userModel.js";

const userModel = new UserModel();

describe("UserModel", () => {
  let userId: number;

  const testUser: User = {
    id: 0,
    first_name: "Leen",
    last_name: "Shaikh",
    email: "leen@example.com",
    password: "123456",
  };

  it("should create a new user", async () => {
    const created = await userModel.create(testUser);
    expect(created.id).toBeDefined();
    expect(created.first_name).toBe(testUser.first_name);
    userId = created.id!;
  });

  it("should return all users", async () => {
    const users = await userModel.getAll();
    expect(users.length).toBeGreaterThan(0);
  });

  it("should return user by ID", async () => {
    const user = await userModel.getById(userId);
    expect(user?.id).toBe(userId);
  });

  it("should update a user", async () => {
    const updated = await userModel.update(userId, {
      first_name: "LeenUpdated",
      last_name: "ShaikhUpdated",
      email: "leenupdated@example.com",
    });
    expect(updated.first_name).toBe("LeenUpdated");
  });

  it("should authenticate user with correct password", async () => {
    const auth = await userModel.authenticate("leenupdated@example.com", "123456");
    expect(auth?.email).toBe("leenupdated@example.com");
  });

  it("should return null for wrong password", async () => {
    const auth = await userModel.authenticate("leenupdated@example.com", "wrongpass");
    expect(auth).toBeNull();
  });

  it("should delete a user", async () => {
  const userToDelete = await userModel.create({
    first_name: "Temp",
    last_name: "User",
    email: "temp@example.com",
    password: "123456",
  });

  const deleted = await userModel.delete(userToDelete.id!);
  expect(deleted.id).toBe(userToDelete.id);
});
});
