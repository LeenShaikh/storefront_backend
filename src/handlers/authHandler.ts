import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const userModel = new UserModel();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.authenticate(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: 'JWT secret is not defined' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret as string,
      { expiresIn: process.env.JWT_EXPIRES_IN as unknown as any } 
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
