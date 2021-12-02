import { Request, RequestHandler, Response } from 'express';
import Order, { Status } from '../models/orders.model';
import IOrder from '../types/order.d';
// const uuidv1 = require('uuid.v1');
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
    const orderId:string = uuidv1();
    const dateCreated:Date = new Date();

    const order:IOrder = new Order({
        orderId,
        customerId,
        products,
        dateCreated,
        status: Status.PENDING
    })
    await order.save();
    return res.status(201).json(order);
};

const getAllorders = async (req: Request, res: Response): void => {
    const orders = await Order.find().exec();
    return res.json(orders);
};

const getOrderbyId = (req: Request, res: Response) => {
    res.status(200).send('Failed');
};

const deleteOrderById = (req: Request, res: Response) => {
    res.status(200).send('Failed');
};

const updateOrderById = (req: Request, res: Response) => {
    res.status(200).send('Failed');
};

export { getAllorders, getOrderbyId, deleteOrderById, updateOrderById, createOrder };
