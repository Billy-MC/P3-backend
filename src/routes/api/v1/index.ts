import { Router, Request, Response } from 'express';
import { store, show, update, destory, index } from '../../../controllers/product';
const route = Router();

// import productController from '../../../controller/product';

export default () => {
  route.get('/products', index);
  route.post('/products', store);
  route.put('/products', update);
  route.delete('/products', destory);
  route.get('/products/:id', show);
};
