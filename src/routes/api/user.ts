import { Router } from 'express';
import { readAll, update, destory, read, create } from '../../controllers/user';

const router = Router();

export default (app: Router) => {
  app.get('/users', readAll);
  app.post('/users', create);
  app.put('/users/:id', update);
  app.delete('/users/:id', destory);
  app.get('/users/:id', read);
};
