import express from 'express';
import { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn } from '../controllers/users.controller';
<<<<<<< HEAD
import { authRoute, restrictTo } from '../middleware/authAccess';
=======
>>>>>>> 0ff61a1 (completed login & signup)

const router = express.Router();

router.get('/', authRoute, getUsers);
router.post('/signup', signUp);
router.post('/login', signIn);
router.put('/:id', updateUser);
router.delete('/:id', authRoute, restrictTo('admin'), deleteUser);
router.get('/:id', getOneUser);

export default router;
