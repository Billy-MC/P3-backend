import { Router } from 'express';

import CustomersController from '../../controllers/customer';

const route = Router();

export default (app: Router) => {
  app.use('/customers', route);
  route.get('/', CustomersController.readAll);
  route.post('/', CustomersController.create);
  route.put('/:id', CustomersController.update);
  route.delete('/:id', CustomersController.delete);
  route.get('/:id', CustomersController.read);
};
