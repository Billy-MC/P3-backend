import { Router } from 'express';
import ProductsController from '../../controllers/product';
const route = Router();

export default (app: Router) => {
  app.use('/products', route);
  route.get('/', ProductsController.readAll);
  route.post('/', ProductsController.create);
  route.put('/:id', ProductsController.update);
  route.delete('/:id', ProductsController.delete);
  route.get('/:id', ProductsController.read);
};
