import { Request, Response } from 'express';

export async function readAll(_req: Request, res: Response) {
  try {
    res.status(200).send('Failed');
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function read(req: Request, res: Response) {
  res.status(200).send('Failed');
}
export async function destory(req: Request, res: Response) {
  res.status(200).send('Failed');
}
export async function update(req: Request, res: Response) {
  res.status(200).send('Failed');
}
export async function create(req: Request, res: Response) {
  res.status(200).send('Failed');
}
