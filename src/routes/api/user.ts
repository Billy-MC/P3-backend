import { Router } from 'express';
import UsersController from '../../controllers/user';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);
  route.get('/', UsersController.readAll);
  route.post('/', UsersController.create);
  route.put('/:id', UsersController.update);
  route.delete('/:id', UsersController.delete);
  route.get('/:id', UsersController.read);
};
