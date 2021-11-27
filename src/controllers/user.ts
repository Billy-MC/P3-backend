import User from '@/models/users';
import order from '@/routes/api/order';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
// import { assert } from 'node:console';
const assert = require('assert');


class UsersController {
  async readAll(_req: Request, res: Response) {
    try {
      const users = User.find();
      res.status(200).json(users);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async read(req: Request, res: Response) {
    try {
      const {id} = req.params;
      assert(id, 'id must exist!');
      const userById = User.findOne({
         _id: new mongoose.Types.ObjectId(id)
      });
      if(res) {
        res.status(200).json({message: userById});
      }else{
        res.status(404).json({message: `${id} not found`});
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
  async update(req: Request, res: Response) {
    try {
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
  async create(req: Request, res: Response) {
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
        message: "Created",
        // id: res._id, //give by mongoDB add
      });
    } catch (e) {
        res.status(400).send(e.message);
    }
  }
}

export default new UsersController();
