import express from 'express';

import {
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
  createNewCustomer,
} from '@controllers/customers.controller';

const router = express.Router();

router.get('/', getAllCustomers);
router.post('/', createNewCustomer);
router.put('/:id', updateCustomerById);
router.delete('/:id', deleteCustomerById);
router.get('/:id', getCustomerById);
export default router;
