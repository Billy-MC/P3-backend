import express from 'express';
import { getUsers, getOneUser, deleteUser, updateUser, createUser } from '../controllers/users.controller';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getOneUser);

export default router;
