import { Request, Response, RequestHandler } from 'express';
import Customer from '@models/customers.model';
import { ICustomer } from '../types/customer';

const getAllCustomers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find().exec();
    res.status(200).json(customers);
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

const getCustomerById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customerById = await Customer.findOne({
      customerId: String(id),
    });
    if (customerById) {
      res.status(200).json({ message: customerById });
    } else {
      res.status(404).json({ error: `${id} not found` });
    }
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

const deleteCustomerById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const CheckById = await Customer.findOne({
      customerId: String(id),
    });
    if (CheckById) {
      await Customer.deleteOne({
        customerId: String(id),
      });
      res.status(204).json({ message: 'deleted' });
    } else {
      res.status(404).json({ error: `${id} not found` });
    }
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

const updateCustomerById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, firstName, lastName, phone, dob, notification, gender, address } = req.body;
  if (
    gender === 'male' ||
    gender === 'female' ||
    gender === 'undisclosed' ||
    gender === null ||
    gender === undefined ||
    gender === ''
  ) {
    const customer = await Customer.findOneAndUpdate(
      { customerId: id },
      {
        email,
        firstName,
        lastName,
        phone,
        dob,
        notification,
        gender,
        address,
      },
      { new: true },
    ).exec();
    if (!customer) {
      return res.status(404).json({ error: 'customer not found.' });
    }
    return res.status(200).json(customer);
  }
  return res
    .status(404)
    .json({ error: 'please enter male or female or undisclosed in gender or you can skip the gender option' });
};

const createNewCustomer: RequestHandler = async (req: Request, res: Response) => {
  const { email, firstName, lastName, phone, dob, notification, gender, address } = req.body;
  if (
    gender === 'male' ||
    gender === 'female' ||
    gender === 'undisclosed' ||
    gender === null ||
    gender === undefined ||
    gender === ''
  ) {
    try {
      const customer: ICustomer = await Customer.create({
        email,
        firstName,
        lastName,
        phone,
        dob,
        notification,
        gender,
        address,
      });
      return res.status(201).json(customer);
    } catch (e) {
      return res.status(400).json((e as Error).message);
    }
  } else {
    return res
      .status(404)
      .json({ error: 'please enter male or female or undisclosed in gender or you can skip the gender option' });
  }
};

export { getAllCustomers, getCustomerById, deleteCustomerById, updateCustomerById, createNewCustomer };
