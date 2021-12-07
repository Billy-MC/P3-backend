import express from 'express';
import { authValidator, restrictTo } from '@middleware/authAccess';
import { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn } from '../controllers/users.controller';

const router = express.Router();

router.get('/', authValidator, getUsers);
router.post('/signup', signUp);
router.post('/login', signIn);
router.put('/:id', updateUser);
router.delete('/:id', authValidator, restrictTo('admin'), deleteUser);
router.get('/:id', getOneUser);

export default router;
