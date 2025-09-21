import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../handlers/userHandler.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/signup', createUser);
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
