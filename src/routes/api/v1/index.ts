import { Router } from 'express';
import product from './product';

export default () => {
  const app = Router();
  product();
  return app;
};
