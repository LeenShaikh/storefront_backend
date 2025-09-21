import type { Request, Response } from 'express';
import { UserModel, type User } from '../models/userModel.js';

const userModel = new UserModel();

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const newUser = await userModel.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: 'User id parameter is required' });
    }
    const user = await userModel.getById(parseInt(idParam));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: 'User id parameter is required' });
    }
    const updatedUser = await userModel.update(parseInt(idParam), req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;
    if (!idParam) {
      return res.status(400).json({ error: 'User id parameter is required' });
    }
    await userModel.delete(parseInt(idParam));
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
