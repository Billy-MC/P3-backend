import { Request, Response, RequestHandler } from 'express';
import { generateToken } from 'utils/jwt';
import User from 'models/users.model';
import { hashPassword, comparePassword } from 'utils/passwordHandler';
import { validateEmail, validatePassword } from 'utils/validator';
import type { IUser } from '../types/users';

// create user
const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;

  if (!email || !firstName || !lastName || !password || !confirmedPassword) {
    return res.status(400).json({ error: 'Please enter all required data!' });
  }
  const passwordValidataResult = validatePassword(password);
  if (!passwordValidataResult) {
    return res.status(400).json({
      error:
        'Password should be 8-32 characters and include at least 1 letter, 1 number and 1 special character (@,#,$,%,^,_,&,*)!',
    });
  }

  if (password !== confirmedPassword) {
    return res.status(400).json({ error: "The passwords don't match." });
  }

  const emailValidateResult = validateEmail(email);
  if (!emailValidateResult) {
    return res.status(400).json({
      error: 'It should be a valid email address!"',
    });
  }

  // check if user exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(403).json({
      error: 'This email has already been existed!',
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

    if (newUser.role === '') {
      return res.status(403).json({
        error: 'This user is failing to create!',
      });
    }

    const token = generateToken(newUser.userId, newUser.role);

    return res
      .set('Authorization', token)
      .status(201)
      .json({
        data: {
          user: newUser,
        },
      });
  } catch (error) {
    return res.status(403).json(error);
  }
};

const signIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Please provide email and password!' });
  }

  const currentUser = await User.findOne({ email }).select('+password');
  if (!currentUser) return res.status(401).send({ error: 'User is not exist!' });

  const correctPassword = await comparePassword(password, currentUser.password);

  if (!correctPassword) {
    return res.status(401).json({ error: 'Invalid password!' });
  }

  const token = generateToken(currentUser.userId, currentUser.role);

  const user = currentUser;
  return res.set('Authorization', token).status(200).json({ user });
};

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().exec();
  return res.status(200).json(users);
};

const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }
  return res.json(user);
};

const deleteUser = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const updateUser = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

export { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn };
