import { Request, Response } from 'express';
import mongoose from 'mongoose';
const assert = require('assert');
import User from '../models/users.model';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const getOneUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    assert(id, 'id must exist!');
    const userById = await User.findOne({
       _id: new mongoose.Types.ObjectId(id)
    });
    if(userById) {
      res.status(200).json({message: userById});
    }else{
      res.status(404).json({error: `${id} not found`});
    }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    assert(id, 'id must exist!');

    const UserById = await User.deleteOne({
      _id: new mongoose.Types.ObjectId(id)
    });

    if (UserById) {
      res.status(200).json({message: 'deleted'+ UserById});
    }else {
      res.status(404).json({error: `${id} not found`});
    }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    assert(id, "id must exist!");
    const {email, firstName, lastName, address} = req.body;
    assert(email !== undefined, 'email must exist!');
    assert(firstName !== undefined, 'first name must exist!');
    assert(lastName !== undefined, 'last name must exist!');
    assert(address.city !== undefined, 'city must exist!');
    assert(address.street !== undefined, 'street must exist!');
    assert(address.postCode !== undefined, 'postCode must exist!');
    const userById = await User.findOne({
      _id: new mongoose.Types.ObjectId(id)
   });

   if(userById) {
     Object.assign(userById, {email, firstName, lastName, address});
     const newUser = new User(userById);
     await newUser.save();
     res.status(200).json({
       message:"Updated"
      });
   }else{
    res.status(404).json({error: `${id} not found`});
   }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const {email, firstName, lastName, address} = req.body;
    // assert(body !== undefined, 'request body must exist!');
    assert(email !== undefined, 'email must exist!');
    assert(firstName !== undefined, 'first name must exist!');
    assert(lastName !== undefined, 'last name must exist!');
    assert(address.city !== undefined, 'city must exist!');
    assert(address.street !== undefined, 'street must exist!');
    assert(address.postCode !== undefined, 'postCode must exist!');
    const user = new User({email, firstName, lastName, address});
    console.log(user)
    await user.save();
    res.status(201).json({
      message: "Created"
      // id: res._id, //give by mongoDB add
    });
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

export { getUsers, getOneUser, deleteUser, updateUser, createUser };
