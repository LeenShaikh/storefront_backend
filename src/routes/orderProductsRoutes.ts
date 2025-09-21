import express from 'express';
import {
  addProductToOrder,
  getAllOrderProducts,
  getOrderProductById,
  updateOrderProduct,
  deleteOrderProduct
} from '../handlers/orderProductsHandler.js';

const router = express.Router();

router.post('/', addProductToOrder);
router.get('/', getAllOrderProducts);
router.get('/:id', getOrderProductById);
router.put('/:id', updateOrderProduct);
router.delete('/:id', deleteOrderProduct);

export default router;
