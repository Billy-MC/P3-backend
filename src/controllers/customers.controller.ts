import { Request, Response } from 'express';

const getCustomers = (req: Request, res: Response): void => {
  res.status(200).send('Get the Customers');
};

const getOneCustomer = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const deleteCustomer = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const updateCustomer = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

const createCustomer = (req: Request, res: Response) => {
  res.status(200).send('Failed');
};

export { getCustomers, getOneCustomer, deleteCustomer, updateCustomer, createCustomer };
