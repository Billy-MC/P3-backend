import { Request, Response } from 'express';

const getProducts = (req: Request, res: Response): void => {
  res.status(200).send('Get the Products');
};

const getOneProduct = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const deleteProduct = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const updateProduct = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const createProduct = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

export { getProducts, getOneProduct, deleteProduct, updateProduct, createProduct };
