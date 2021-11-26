import { Request, Response } from 'express';

class CustomersController {
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
      res.status(200).send('Failed');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}

export default new CustomersController();
