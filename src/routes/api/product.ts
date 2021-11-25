import { Router } from 'express';
import { readAll, update, destory, read, create } from '../../controllers/product';
const router = Router();

export default (app: Router) => {
  app.get('/products', readAll);
  app.post('/products', create);
  app.put('/products/:id', update);
  app.delete('/products/:id', destory);
  app.get('/products/:id', read);
};
