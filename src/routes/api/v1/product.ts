import { Router, Request, Response } from 'express';
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getAllProductHandler,
} from '../../../controller/product';
const route = Router();

// import productController from '../../../controller/product';

export default () => {
  route.get('/', getAllProductHandler);
  route.post('/', createProductHandler);
  route.put('/', updateProductHandler);
  route.delete('/', deleteProductHandler);
  route.get('/:id', getProductHandler);
};
