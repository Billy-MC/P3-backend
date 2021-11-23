import { Router } from 'express';
import CustomersController from '../../controllers/customer';
const router = Router();

export default (app: Router) => {
  app.get('/customers', CustomersController.readAll);
  app.post('/customers', CustomersController.create);
  app.put('/customers', CustomersController.update);
  app.delete('/customers', CustomersController.delete);
  app.get('/customers/:id', CustomersController.read);
};
