import { Request, Response, RequestHandler } from 'express';
import Customer from '@models/customers.model';
import { ICustomer } from '../types/customer';

const getAllCustomers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find().exec();
    res.status(200).json(customers);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getCustomerById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customerById = await Customer.findOne({
      customerId: String(id)
    });
    if (customerById) {
      res.status(200).json({ message: customerById });
    } else {
      res.status(404).json({ error: `${id} not found` });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteCustomerById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const CheckById = await Customer.findOne({
      customerId: String(id)
    });
    if (CheckById) {
      await Customer.deleteOne({
        customerId: String(id)
      });
      res.status(204).json({ message: 'deleted' });
    } else {
      res.status(404).json({ error: `${id} not found` });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateCustomerById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    email,
    firstName,
    lastName,
    phone,
    DOB,
    notification,
    gender,
    address
  } = req.body;
  const customer = await Customer.findOneAndUpdate(
    { customerId: id },
    {
      email,
      firstName,
      lastName,
      phone,
      DOB,
      notification,
      gender,
      address
    },
    { new: true }
  ).exec();
  if (!customer) {
    return res.status(404).json({ error: 'customer not found.' });
  }
  return res.status(200).json(customer);
};

const createNewCustomer: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phone,
      DOB,
      notification,
      gender,
      address
    } = req.body;
    const customer: ICustomer = await Customer.create({
      email,
      firstName,
      lastName,
      phone,
      DOB,
      notification,
      gender,
      address
    });
    res.status(201).json(customer);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export { getAllCustomers, getCustomerById, deleteCustomerById, updateCustomerById, createNewCustomer };
