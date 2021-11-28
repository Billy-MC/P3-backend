import { Router } from 'express';

import {
  getCustomers,
  getOneCustomer,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} from '../controllers/customers.controller';

const route = Router();

export default (app: Router) => {
  app.use('/customers', route);
  route.get('/', getCustomers);
  route.post('/', createCustomer);
  route.put('/:id', updateCustomer);
  route.delete('/:id', deleteCustomer);
  route.get('/:id', getOneCustomer);
};
