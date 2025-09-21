import type { Request, Response } from 'express';
import { OrderModel, type Order } from '../models/orderModel.js';

const orderModel = new OrderModel();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const newOrder = await orderModel.create(order);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderModel.getAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (typeof idParam !== 'string') {
      return res.status(400).json({ error: 'Order id is required' });
    }
    const order = await orderModel.getById(parseInt(idParam));
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (typeof idParam !== 'string') {
      return res.status(400).json({ error: 'Order id is required' });
    }
    const updatedOrder = await orderModel.update(parseInt(idParam), req.body);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (typeof idParam !== 'string') {
      return res.status(400).json({ error: 'Order id is required' });
    }
    await orderModel.delete(parseInt(idParam));
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
