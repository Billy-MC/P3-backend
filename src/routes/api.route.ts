import express, { Request, Response } from 'express';
import productRouter from './product.route';
import customerRouter from './customer.route';
import userRouter from './user.route';
import orderRouter from './order.route';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('APIs working');
});

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/customers', customerRouter);
router.use('/orders', orderRouter);

export default router;
