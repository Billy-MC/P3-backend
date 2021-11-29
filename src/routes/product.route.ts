import { Router } from 'express';
import {
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/products.controller';

const route = Router();

export default (app: Router) => {
  app.use('/products', route);
  route.get('/', getProducts);
  route.post('/', createProduct);
  route.put('/:id', updateProduct);
  route.delete('/:id', deleteProduct);
  route.get('/:id', getOneProduct);
};
