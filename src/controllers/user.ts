import User from '@/models/users';
import order from '@/routes/api/order';
import { Request, Response } from 'express';
// import { assert } from 'node:console';
const assert = require('assert');


class UsersController {
  async readAll(_req: Request, res: Response) {
    try {
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async read(req: Request, res: Response) {
    try {
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
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
      const body = req.body;
      assert(body !== undefined, 'request body must exist!');
      assert(body.email !== undefined, 'email must exist!');
      assert(body.firstName !== undefined, 'first name must exist!');

      const user = new User(body);
      const res = await user.save();

      res.status(201).json({
        message: "Created",
        id: res._id, //give by mongoDB
      });
    } catch (e) {
        res.status(400).send(e.message);
    }
  }
}

export default new UsersController();
