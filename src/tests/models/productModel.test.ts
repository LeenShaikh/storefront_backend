import { describe, it, expect, beforeAll, afterAll } from "vitest";
import pool from "../../database.js";
import { ProductModel } from "../../models/productModel.js";

const productModel = new ProductModel();
let productId: number;

describe("ProductModel", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM products");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM products");
    await pool.end();
  });

  it("should create a new product", async () => {
    const product = await productModel.create({
      name: "Cucumber",
      price: 3,
    });

    expect(product).toHaveProperty("id");
    productId = product.id as number;
  });

  it("should return all products", async () => {
    const products = await productModel.getAll();
    expect(products.length).toBeGreaterThan(0);
  });

  it("should return product by ID", async () => {
    const product = await productModel.getById(productId);
    expect(product?.id).toBe(productId);
    expect(product?.name).toBe("Cucumber");
  });

  it("should update a product", async () => {
    const updated = await productModel.update(productId, {
      name: "Cucumber",
      price: 3,
    });

    expect(updated.name).toBe("Cucumber");
    expect(Number(updated.price)).toBe(3); 
  });

  it("should delete a product", async () => {
    await productModel.delete(productId);
    const product = await productModel.getById(productId);
    expect(product).toBeNull();
  });
});
