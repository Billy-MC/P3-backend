import express from 'express';
import { authValidator, isAdmin } from '@middleware/authAccess';

import {
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
  createNewCustomer,
} from '@controllers/customers.controller';

const router = express.Router();

router.get('/', authValidator, isAdmin('admin'), getAllCustomers);
router.post('/', createNewCustomer);
router.put('/:id', updateCustomerById);
router.delete('/:id', deleteCustomerById);
router.get('/:id', getCustomerById);
console.log("testing");
export default router;
