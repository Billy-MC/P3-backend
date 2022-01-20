import express from 'express';
import { authValidator, isAdmin } from '@middleware/authAccess';
import {
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
  signUp,
  signIn,
  updatePassword,
  updateMe,
  deleteMe,
} from '@controllers/users.controller';

const router = express.Router();

router.get('/', authValidator, getUsers);
router.post('/signup', signUp);
router.post('/login', signIn);
router.put('/:email', updateUser);
router.delete('/:email', authValidator, isAdmin('admin'), deleteUser);
router.get('/:email', getOneUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.patch('/deleteMe', deleteMe);

export default router;
