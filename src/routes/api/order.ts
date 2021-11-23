import { Router } from 'express';
import OrdersController from '../../controllers/order';
const router = Router();

export default (app: Router) => {
  app.get('/orders', OrdersController.readAll);
  app.post('/orders', OrdersController.create);
  app.put('/orders', OrdersController.update);
  app.delete('/orders', OrdersController.delete);
  app.get('/orders/:id', OrdersController.read);
};
