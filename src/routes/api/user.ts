import { Router } from 'express';
import UsersController from '../../controllers/user';

const router = Router();

export default (app: Router) => {
  app.get('/users', UsersController.readAll);
  app.post('/users', UsersController.create);
  app.put('/users', UsersController.update);
  app.delete('/users', UsersController.delete);
  app.get('/users/:id', UsersController.read);
};
