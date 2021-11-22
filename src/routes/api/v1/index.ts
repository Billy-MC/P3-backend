import { Router, Request, Response } from 'express';
import ProductsController from '../../../controllers/product';
import CustomersController from '../../../controllers/customer';

const route = Router();

// import productController from '../../../controller/product';

export default () => {
  route.get('/products', CustomersController.index);
  route.post('/products', CustomersController.store);
  route.put('/products', CustomersController.update);
  route.delete('/products', CustomersController.destory);
  route.get('/products/:id', CustomersController.show);

  route.get('/customers', ProductsController.index);
  route.post('/customers', ProductsController.store);
  route.put('/customers', ProductsController.update);
  route.delete('/customers', ProductsController.destory);
  route.get('/customers/:id', ProductsController.show);
};
