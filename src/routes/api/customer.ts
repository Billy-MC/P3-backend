import { Router } from 'express';
import { readAll, update, destory, read, create } from '../../controllers/customer';

export default (app: Router) => {
  app.get('/customers', readAll);
  app.post('/customers', create);
  app.put('/customers/:id', update);
  app.delete('/customers/:id', destory);
  app.get('/customers/:id', read);
};
