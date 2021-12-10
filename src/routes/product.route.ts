import express from 'express';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from '../controllers/products.controller';

const productRouter = express.Router();

productRouter.get('', getAllProducts);
productRouter.post('', addProduct);
productRouter.put('/:id', updateProductById);
productRouter.delete('/:id', deleteProductById);
productRouter.get('/:id', getProductById);

export default productRouter;
