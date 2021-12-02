import { Request, RequestHandler, Response } from 'express';
import Order from '../models/orders.model';
import IOrder from '../types/order.d';
import { v1 as uuidv1 } from 'uuid';
const Joi = require('joi');

const createOrder: RequestHandler = async (req: Request, res: Response) => {
  const { customerId, products } = req.body;
  // const schema = Joi.object({
  //     customer: Joi.string().required(), // TODO: check if it is UUID
  //     produccts: Joi.array().required(), // TODO: add not empy logic, and contain only uuid
  //     date: Joi.date().required(),
  //     status: Joi.String().equals        // add more lagic later
  // })
  const orderId: string = uuidv1();
  const dateCreated: Date = new Date();
  const order: IOrder = new Order({
    orderId,
    customerId,
    products,
    dateCreated,
    status: 'PENDING',
  });

  try {
    await order.save();
  } catch (e) {
    return res.status(500).json({ error: 'server error' });
  }

  return res.status(201).json(order);
};

const getAllorders = async (req: Request, res: Response) => {
  const orders: Object = await Order.find().exec();
  return res.json(orders);
};

const getOrderbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const order = await Order.findOne({ orderId: id });
  if (!order) {
    return res.status(404).json({ error: 'order not found' });
  }
  return res.json(order);
};

const deleteOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const order: Object = await Order.deleteOne({ orderId: id });
  if (!order) {
    return res.status(405).json({ error: 'order not found' });
  }
  return res.sendStatus(204);
};

const updateOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { customerId, products, status } = req.body;
  // try {
  const order = await Order.findOneAndUpdate({ orderId: id }, { customerId, products, status }, { new: true }).exec();
  // } catch (e) {
  //   retrun res.status(500).json({ error:'server error'});
  // }
  if (!order) {
    return res.status(405).json({ error: 'order not found.' });
  }
  return res.json(order);
};

export { getAllorders, getOrderbyId, deleteOrderById, updateOrderById, createOrder };
