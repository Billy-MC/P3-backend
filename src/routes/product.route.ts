import express from 'express';
import {
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/products.controller';

const router = express.Router();
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getOneProduct);

export default router;
