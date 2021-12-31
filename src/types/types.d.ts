import type { User, Product } from 'models/user';

declare global {
  namespace Express {
    interface Request {
      user: User;
      product: Product;
    }
  }
}
