import { Request, Response, RequestHandler } from 'express';

import User from '../models/users.model';
import { IUser } from '../types/users.d';
import { hashPassword } from '../utils/passwordHandler';
import { jwtEncode } from '../utils/jwt';

const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ status: 'Fail', error: 'Please enter all required data!' });
  }

  // check if user exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(403).json({
      status: 'Fail',
      error: 'This email has already been existed!',
    });
  }
  // create user

  const encodePassword = await hashPassword(password);
  try {
    const newUser: IUser = await User.create({
      email,
      firstName,
      lastName,
      password: encodePassword,
    });
    const token = jwtEncode({ id: newUser.userId });
    return res.status(200).json({
      status: 'Success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(403).json({ error: 'password is not approved' });
  }
};

const getUsers = (req: Request, res: Response): void => {
  res.status(200).send('Get the Users');
};

const getOneUser = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const deleteUser = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const updateUser = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

export { getUsers, getOneUser, deleteUser, updateUser, signUp };
