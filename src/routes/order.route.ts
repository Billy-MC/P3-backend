import { Router } from 'express';
import {
  getAllOrders,
  getOrderbyId,
  deleteOrderById,
  updateOrderById,
  createOrder,
} from '../controllers/orders.controller';

const router = Router();

router.get('/', getAllOrders);
router.post('/', createOrder);
router.put('/:id', updateOrderById);
router.delete('/:id', deleteOrderById);
router.get('/:id', getOrderbyId);

export default router;
