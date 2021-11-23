import { Router, Request, Response } from 'express';
import ProductsController from '../../../controllers/product';
import CustomersController from '../../../controllers/customer';

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

export default router;
