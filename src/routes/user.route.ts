import express from 'express';
import { authRoute, restrictTo } from '@middleware/authAccess';
import { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn } from '../controllers/users.controller';

const router = express.Router();

router.get('/', authRoute, getUsers);
router.post('/signup', signUp);
router.post('/login', signIn);
router.put('/:id', updateUser);
router.delete('/:id', authRoute, restrictTo('admin'), deleteUser);
router.get('/:id', getOneUser);

export default router;
