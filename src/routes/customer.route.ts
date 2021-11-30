import express from 'express';

import {
  getCustomers,
  getOneCustomer,
  deleteCustomer,
  updateCustomer,
  createCustomer,
} from '../controllers/customers.controller';

const router = express.Router();

router.get('/', getCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.get('/:id', getOneCustomer);

export default router;
