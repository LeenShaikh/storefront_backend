import express from 'express';
import usersRouter from './routes/usersRoutes.js';
import productsRouter from './routes/productsRoutes.js';
import ordersRouter from './routes/ordersRoutes.js';
import orderProductsRouter from './routes/orderProductsRoutes.js';
import authRouter from './routes/authRoutes.js';
import { verifyToken } from './middleware/authMiddleware.js';

const app = express();

app.use(express.json());

app.use('/auth',authRouter);
app.use('/users', usersRouter);
app.use('/products', verifyToken, productsRouter);
app.use('/orders', verifyToken, ordersRouter);
app.use('/order-products',verifyToken, orderProductsRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
