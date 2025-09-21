import type { Request, Response } from 'express';
import { ProductModel, type Product } from '../models/productModel.js';

const productModel = new ProductModel();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const newProduct = await productModel.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const product = await productModel.getById(parseInt(idParam));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    const updatedProduct = await productModel.update(parseInt(idParam), req.body);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    await productModel.delete(parseInt(idParam));
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
