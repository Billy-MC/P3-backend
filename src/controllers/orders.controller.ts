import { v1 as uuidv1 } from 'uuid';
import { Request, RequestHandler, Response } from 'express';
import Order from '../models/orders.model';

const createOrder: RequestHandler = async (req: Request, res: Response) => {
  const { customerId, products } = req.body;
  if (!customerId || !products) {
    return res.status(400).json({ error: 'input fields cannot be empty.' });
  }
  const orderId: string = uuidv1();
  const dateCreated: Date = new Date();
  const order = new Order({
    orderId,
    customerId,
    products,
    dateCreated,
    status: 'PENDING',
  });

  try {
    await order.save();
  } catch (error) {
    return res.status(406).json({ error: `{error.message}` });
  }
  return res.status(201).json(order);
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
