import { Router } from 'express';
import { getOrders, getOneOrder, deleteOrder, updateOrder, createOrder } from '../controllers/orders.controller';

const route = Router();

export default (app: Router) => {
  app.use('/orders', route);
  route.get('/', getOrders);
  route.post('/', createOrder);
  route.put('/:id', updateOrder);
  route.delete('/:id', deleteOrder);
  route.get('/:id', getOneOrder);
};
