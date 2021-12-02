import { Router } from 'express';
import { getAllorders, getOrderbyId, deleteOrderById, updateOrderById, createOrder } from '../controllers/orders.controller';

const router = Router();

router.get('/', getAllorders);
router.post('/', createOrder);
router.put('/:id', updateOrderById);
router.delete('/:id', deleteOrderById);
router.get('/:id', getOrderbyId);

export default router;
