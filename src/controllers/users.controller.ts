import { Request, Response, RequestHandler } from 'express';

import { jwtEncoder } from '@utils/jwt';
import User from '@models/users.model';
import { hashPassword, comparePassword } from '@utils/passwordHandler';
import type { IUser } from '../types/users';

// create user
const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;

  if (!email || !firstName || !lastName || !password || !confirmedPassword) {
    return res.status(400).json({ message: 'Please enter all required data!' });
  }

  if (password !== confirmedPassword) {
    return res.status(400).json({ message: "The passwords don't match." });
  }

  // check if user exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(403).json({
      message: 'This email has already been existed!',
    });
  }

  const hashedPassword = await hashPassword(password);
  try {
    const newUser: IUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role: req.body.role,
    });

    const token = jwtEncoder(newUser.userId, newUser.role);

    return res.status(201).json({
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(403).json({ error: 'password is not approved' });
  }
};

const signIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ err: 'Please provide email and password!' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).send({ err: 'User is not exist!' });

  const correctPassword = await comparePassword(password, user.password);

  if (!correctPassword) {
    return res.status(401).json({ err: 'Invalid email or password!' });
  }

  const token = jwtEncoder(user.userId, user.role);

  return res.status(200).json({
    token,
    user,
  });
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

export { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn };
