import express from 'express';
import { getUsers, getOneUser, deleteUser, updateUser, createUser } from '../controllers/users.controller';
import signup from '../controllers/auth.controller';

const router = express.Router();

router.post('/signup', signup);

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getOneUser);

export default router;
