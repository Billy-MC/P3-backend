import { Request, Response } from 'express';

class UsersController {
  async index(req: Request, res: Response) {
    try {
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  async show(req: Request, res: Response) {
    try {
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
  async destory(req: Request, res: Response) {
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
  async store(req: Request, res: Response) {
    try {
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

export default new UsersController();
