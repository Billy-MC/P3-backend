import express, { Request, Response } from 'express';
import productRouter from './product.route';
import customerRouter from './customer.route';
import userRouter from './user.route';
import orderRouter from './order.route';
import indexRouter from './index.route';

const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  res.send('APIs working');
});
router.use('/', indexRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);

export default router;
