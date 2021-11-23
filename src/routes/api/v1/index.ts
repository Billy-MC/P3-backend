import { Router, Request, Response } from 'express';
import ProductsController from '../../../controllers/product';
import CustomersController from '../../../controllers/customer';
import UsersController from '../../../controllers/user';
import OrdersController from '../../../controllers/order';

const router = Router();

// import productController from '../../../controller/product';

router.get('/', (req: Request, res: Response) => res.sendStatus(200));

router.get('/products', CustomersController.index);
router.post('/products', CustomersController.store);
router.put('/products', CustomersController.update);
router.delete('/products', CustomersController.destory);
router.get('/products/:id', CustomersController.show);

router.get('/customers', ProductsController.index);
router.post('/customers', ProductsController.store);
router.put('/customers', ProductsController.update);
router.delete('/customers', ProductsController.destory);
router.get('/customers/:id', ProductsController.show);

router.get('/users', UsersController.index);
router.post('/users', UsersController.store);
router.put('/users', UsersController.update);
router.delete('/users', UsersController.destory);
router.get('/users/:id', UsersController.show);

router.get('/orders', OrdersController.index);
router.post('/orders', OrdersController.store);
router.put('/orders', OrdersController.update);
router.delete('/orders', OrdersController.destory);
router.get('/orders/:id', OrdersController.show);

export default router;
