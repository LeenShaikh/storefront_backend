import type { Request, Response } from 'express';
import { OrderProductModel, type OrderProduct } from '../models/orderProductsModel.js';

const orderProductsModel = new OrderProductModel();

export const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const orderProduct: OrderProduct = req.body;
    const newOrderProduct = await orderProductsModel.create(orderProduct);
    res.status(201).json(newOrderProduct);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllOrderProducts = async (_req: Request, res: Response) => {
  try {
    const orderProducts = await orderProductsModel.getAll();
    res.json(orderProducts);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getOrderProductById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: 'Missing id parameter' });
    }
    const orderProduct = await orderProductsModel.getById(parseInt(idParam));
    if (!orderProduct) return res.status(404).json({ message: 'OrderProduct not found' });
    res.json(orderProduct);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateOrderProduct = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: 'Missing id parameter' });
    }
    const updatedOrderProduct = await orderProductsModel.update(parseInt(idParam), req.body);
    res.json(updatedOrderProduct);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: 'Missing id parameter' });
    }
    await orderProductsModel.delete(parseInt(idParam));
    res.json({ message: 'OrderProduct deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
