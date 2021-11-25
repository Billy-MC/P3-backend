import { Router } from 'express';
import OrdersController from '../../controllers/order';
const route = Router();

export default (app: Router) => {
  app.use('/orders', route);
  route.get('/', OrdersController.readAll);
  route.post('/', OrdersController.create);
  route.put('/:id', OrdersController.update);
  route.delete('/:id', OrdersController.delete);
  route.get('/:id', OrdersController.read);
};
