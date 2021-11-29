import { Router } from 'express';
import { getUsers, getOneUser, deleteUser, updateUser, createUser } from '../controllers/users.controller';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);
  route.get('/', getUsers);
  route.post('/', createUser);
  route.put('/:id', updateUser);
  route.delete('/:id', deleteUser);
  route.get('/:id', getOneUser);
};
