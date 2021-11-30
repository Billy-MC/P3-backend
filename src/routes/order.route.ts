import express from 'express';
import { getOrders, getOneOrder, deleteOrder, updateOrder, createOrder } from '../controllers/orders.controller';

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/:id', getOneOrder);

export default router;
