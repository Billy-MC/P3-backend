import express from 'express';
import { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn } from '../controllers/users.controller';

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signUp);
router.post('/login', signIn);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getOneUser);

export default router;
