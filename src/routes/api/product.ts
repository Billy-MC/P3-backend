import { Router } from 'express';
import ProductsController from '../../controllers/product';
const router = Router();

export default (app: Router) => {
  app.get('/products', ProductsController.readAll);
  app.post('/products', ProductsController.create);
  app.put('/products', ProductsController.update);
  app.delete('/products', ProductsController.delete);
  app.get('/products/:id', ProductsController.read);
};
