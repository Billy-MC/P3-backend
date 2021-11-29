import { Request, Response } from 'express';

const getOrders = (req: Request, res: Response): void => {
  res.status(200).send('Get the Orders');
};

const getOneOrder = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const deleteOrder = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const updateOrder = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const createOrder = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

export { getOrders, getOneOrder, deleteOrder, updateOrder, createOrder };
