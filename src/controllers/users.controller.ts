import { Request, Response, RequestHandler } from 'express';
import { generateToken } from '@utils/jwt';
import User from '@models/users.model';
import { hashPassword, comparePassword } from '@utils/passwordHandler';
import { validateEmail, validatePassword } from '@utils/validator';
import type { IUser } from '../types/users';

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = generateToken(user.userId, user.role);

  if (!token) {
    return res.status(401).json({ error: 'Cannot sign the token' });
  }

  return res
    .set('Authorization', token)
    .status(statusCode)
    .json({
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
      },
    });
};

// create user

const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password, confirmedPassword } = req.body;

  if (!email || !firstName || !lastName || !password || !confirmedPassword || !phone) {
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

  const hashedPassword = await hashPassword(password);

  try {
    // check if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: 'This email has already been existed!' });
    }

    const newUser: IUser = await User.create({
      email,
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      role: req.body.role,
    });

    if (newUser.role === '') {
      return res.status(403).json({
        error: 'This user is failing to create!',
      });
    }

    createSendToken(newUser, 200, res);
  } catch (error) {
    return res.status(403).json((error as Error).message);
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password!' });
  }
  try {
    const currentUser = await User.findOne({ email }).select('+password');
    if (!currentUser) {
      return res.status(401).json({ error: 'User is not exist!' });
    }

    const correctPassword = await comparePassword(password, currentUser.password);

    if (!correctPassword) {
      return res.status(401).json({ error: 'Invalid password!' });
    }

    createSendToken(currentUser, 200, res);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

const updatePassword: RequestHandler = async (req: Request, res: Response) => {
  const { email, currentPassword, password, confirmedPassword } = req.body;

  // Get user from collection
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ error: 'User is not exist!' });
  }

  try {
    // Check if POSTed current password is correct
    const correctPassword = await comparePassword(currentPassword, user.password);
    if (!correctPassword) {
      return res.status(401).json({ error: 'Your current password is wrong!' });
    }
    // Validate the password pattern
    const passwordValidataResult = validatePassword(password);
    if (!passwordValidataResult) {
      return res.status(400).json({
        error:
          'Password should be 8-32 characters and include at least 1 letter, 1 number and 1 special character (@,#,$,%,^,_,&,*)!',
      });
    }
    // Check confirmed Password is match
    if (password !== confirmedPassword) {
      return res.status(400).json({ error: "The passwords don't match." });
    }

    const hashedPassword = await hashPassword(password);
    // If so, update pasword
    user.password = hashedPassword;
    await user.save();
    // Keep user logged in
    createSendToken(user, 200, res);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

const updateMe = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, confirmedPassword, phone } = req.body;
  if (password || confirmedPassword) {
    return res.status(400).json({ error: 'This route is not for password updates.' });
  }
  const updateInfo = { firstName, lastName, phone };

  const updatedCurrentUser = await User.findOneAndUpdate({ email }, updateInfo, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    user: updatedCurrentUser,
  });
};

// inactive current User
const deleteMe = async (req: Request, res: Response) => {
  const { email } = req.body;
  await User.findOneAndUpdate({ email }, { active: false });
  res.status(204).json({ data: null });
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().exec();
    if (!users) {
      res.status(400).json({ error: 'No users exist' });
    }
    return res.status(200).json(users);
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

const getOneUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: `${email}` }).exec();
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: String(email) }).exec();
    if (user) {
      await User.deleteOne({ email: String(email) });
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: `${email} not found` });
    }
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { firstName, lastName, phone, password } = req.body;

  if (!firstName || !lastName || !password || !phone) {
    return res.status(400).json({ error: 'input fields cannot be empty.' });
  }

  try {
    const userByEmail = await User.findOne({ email: `${email}` });
    if (!userByEmail) {
      res.status(404).json({ error: `${email} not found` });
    } else {
      const userUpdate = await User.findOneAndUpdate(
        { email: `${email}` },
        {
          firstName,
          lastName,
          phone,
          password,
        },
        { new: true },
      ).exec();
      return res.status(200).json(userUpdate);
    }
  } catch (e) {
    return res.status(400).json((e as Error).message);
  }
};

export { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn, updatePassword, updateMe, deleteMe };
