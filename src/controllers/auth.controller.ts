import { Request, Response, RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/users.model';
import { hash } from '../utils/passwordEncryp';
import { jwtSign } from '../utils/jwt';

const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ status: 'Fail', error: 'Please enter all required data!' });
  }

  // check if user exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(404).json({
      status: 'Fail',
      error: 'This email has already been existed!',
    });
  }
  // create user
  const userId = uuidv4();
  const hashPassword = await hash(password);
  try {
    const newUser = await User.create({
      userId,
      email,
      firstName,
      lastName,
      password: hashPassword,
    });
    const token = jwtSign({ id: newUser.userId });
    return res.status(200).json({
      status: 'Success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export default signUp;
