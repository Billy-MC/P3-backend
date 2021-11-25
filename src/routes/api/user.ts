import { Router } from 'express';
import { readAll, update, destory, read, create } from '../../controllers/user';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);
  route.get('/', readAll);
  route.post('/', create);
  route.put('/:id', update);
  route.delete('/:id', destory);
  route.get('/:id', read);
};
