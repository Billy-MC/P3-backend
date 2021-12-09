import { Request, RequestHandler, Response } from 'express';
import Order from '../models/orders.model';
import IOrder from '../types/order';
const Joi = require('joi');

const createOrder: RequestHandler = async (req: Request, res: Response) => {
  const { customerId, products } = req.body;
  if (!customerId || !products) {
    return res.status(400).json({ error: 'input fields cannot be empty.' });
  }

  try {
    const dateCreated: Date = new Date();
    const order: IOrder = await Order.create({
      customerId,
      products,
      dateCreated,
      status: 'PENDING',
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(403).json((error as Error).message);
  }
};

const getAllOrders: RequestHandler = async (req: Request, res: Response) => {
  const orders = await Order.find().exec();
  return res.json(orders);
};

const getOrderbyId: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findOne({ orderId: id });
  if (!order) {
    return res.status(404).json({ error: 'order not found' });
  }
  return res.json(order);
};

const deleteOrderById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findOneAndDelete({ orderId: id });
  if (!order) {
    return res.status(404).json({ error: 'order not found' });
  }
  return res.status(200).json(order);
};

const updateOrderById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { customerId, products, status } = req.body;
  if (!customerId || !products || !status) {
    return res.status(400).json({ error: 'input fields cannot be empty.' });
  }
  const order = await Order.findOneAndUpdate({ orderId: id }, { customerId, products, status }, { new: true }).exec();
  if (!order) {
    return res.status(404).json({ error: 'order not found.' });
  }
  return res.json(order);
};

export { getAllOrders, getOrderbyId, deleteOrderById, updateOrderById, createOrder };
