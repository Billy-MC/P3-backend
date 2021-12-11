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
    return res.status(403).json((error as Error).message);
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    assert(id, 'id must exist!');

    const UserById = await User.deleteOne({
      _id: new mongoose.Types.ObjectId(id)
    });

    if (UserById) {
      res.status(200).json({ message: 'deleted' + UserById });
    } else {
      res.status(404).json({ error: `${id} not found` });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    assert(id, "id must exist!");
    const { email, firstName, lastName, address } = req.body;
    assert(email !== undefined, 'email must exist!');
    assert(firstName !== undefined, 'first name must exist!');
    assert(lastName !== undefined, 'last name must exist!');
    assert(address.city !== undefined, 'city must exist!');
    assert(address.street !== undefined, 'street must exist!');
    assert(address.postCode !== undefined, 'postCode must exist!');
    const userById = await User.findOne({
      _id: new mongoose.Types.ObjectId(id)
    });

    if (userById) {
      Object.assign(userById, { email, firstName, lastName, address });
      const newUser = new User(userById);
      await newUser.save();
      res.status(200).json({
        message: "Updated"
      });
    } else {
      res.status(404).json({ error: `${id} not found` });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

<<<<<<< HEAD
const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, address } = req.body;
    // assert(body !== undefined, 'request body must exist!');
    assert(email !== undefined, 'email must exist!');
    assert(firstName !== undefined, 'first name must exist!');
    assert(lastName !== undefined, 'last name must exist!');
    assert(address.city !== undefined, 'city must exist!');
    assert(address.street !== undefined, 'street must exist!');
    assert(address.postCode !== undefined, 'postCode must exist!');
    const user = new User({ email, firstName, lastName, address });
    console.log(user)
    await user.save();
    res.status(201).json({
      message: "Created"
      // id: res._id, //give by mongoDB add
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export { getUsers, getOneUser, deleteUser, updateUser, createUser };
=======
export { getUsers, getOneUser, deleteUser, updateUser, signUp, signIn };
>>>>>>> feature/DEV-18-practice-crud---product-side
