import { Router, Request, Response } from 'express';
import product from './product';
import customer from './customer';
import user from './user';
import order from './order';

const router = Router();

export default () => {
  const app = Router();
  app.get('/', (req: Request, res: Response) => res.sendStatus(200));
  product(app);
  user(app);
  customer(app);
  order(app);

  return app;
};
