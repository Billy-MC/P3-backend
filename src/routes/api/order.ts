import { Router } from 'express';
import { readAll, update, destory, read, create } from '../../controllers/order';
const router = Router();

export default (app: Router) => {
  app.get('/orders', readAll);
  app.post('/orders', create);
  app.put('/orders/:id', update);
  app.delete('/orders/:id', destory);
  app.get('/orders/:id', read);
};
