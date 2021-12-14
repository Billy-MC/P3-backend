import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} from '@customers.controller';

const productRouter = express.Router();

productRouter.get('', getAllProducts);
productRouter.post('', createProduct);
productRouter.put('/:id', updateProductById);
productRouter.delete('/:id', deleteProductById);
productRouter.get('/:id', getProductById);

export default productRouter;


