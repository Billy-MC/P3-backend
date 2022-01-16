import { Request, RequestHandler, Response } from 'express';
import Order from '@models/orders.model';
import Customer from '@models/customers.model';
import Product from '@models/products.model';
import IOrder, { IProduct, ICustomerInfo } from '../types/order';

/**
 * @swagger
 * /orders:
 *  post:
 *    tags: [Orders]
 *    summary: create a new Order, Only provide for 3rd party API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          example:
 *            customerInfo:
 *              name: James Rock
 *              email: ante@aol.net
 *            products:
 *              - sku: 0948c595-5766-4621-893a-a4b56553aa62
 *                quantity: 2
 *                price: 539
 *              - sku: 53d08caa-d952-422c-9baf-26539f21e3c1
 *                quantity: 2
 *                price: 539
 *    responses:
 *      '201':
 *        description: Created
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *            example:
 *              customerInfo:
 *                name: James Rock
 *                email: ante@aol.net
 *              products:
 *                - sku: 0948c595-5766-4621-893a-a4b56553aa62
 *                  quantity: 2
 *                  price: 539
 *                  _id: 61e3514093ae6034b2aebb75
 *                - sku: 53d08caa-d952-422c-9baf-26539f21e3c1
 *                  quantity: 2
 *                  price: 1010
 *                  _id: 61e3514093ae6034b2aebb76
 *              _id: 61e3514093ae6034b2aebb74
 *              orderId: OR-1642287424132
 *              dateCreated: '2022-01-15T22:57:04.132Z'
 *              status: PENDING
 *              __v: 0
 *      '400':
 *        description: Customer not exist
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  exmaple: 'Customer James Rock, ante@aol.net doesn not exist. '
 */
const createOrder: RequestHandler = async (req: Request, res: Response) => {
  const { customerInfo, products } = req.body;

  if (!customerInfo || !products || products.length === 0) {
    return res.status(400).json({ error: 'input fields cannot be empty.' });
  }
  if (!Customer.findOne({ email: `${customerInfo.email}` })) {
    return res.status(400).json({ error: `Customer ${customerInfo.name}, ${customerInfo.email} does not exist.` });
  }

  try {
    const order: IOrder = await Order.create({
      customerInfo,
      products,
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(403).json((error as Error).message);
  }
};

/**
 * @swagger
 * /orders:
 *  get:
 *    summary: return all Orders
 *    tags: [Orders]
 *    responses:
 *      200:
 *        description:  array of Customer Objects should be returned
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *            example:
 *              - customerInfo:
 *                  name: James Rock
 *                  email: ante@aol.net
 *                products:
 *                  - sku: 0948c595-5766-4621-893a-a4b56553aa62
 *                    quantity: 2
 *                    price: 539
 *                    _id: 61e3514093ae6034b2aebb75
 *                  - sku: 53d08caa-d952-422c-9baf-26539f21e3c1
 *                    quantity: 2
 *                    price: 1010
 *                    _id: 61e3514093ae6034b2aebb76
 *                _id: 61e3514093ae6034b2aebb74
 *                orderId: OR-1642287424132
 *                dateCreated: '2022-01-15T22:57:04.132Z'
 *                status: PENDING
 *                __v: 0
 *              - customerInfo:
 *                  name: James Rock
 *                  email: ante@aol.net
 *                products:
 *                  - sku: 0948c595-5766-4621-893a-a4b56553aa62
 *                    quantity: 2
 *                    price: 539
 *                    _id: 61e3514093ae6034b2aebb75
 *                  - sku: 53d08caa-d952-422c-9baf-26539f21e3c1
 *                    quantity: 2
 *                    price: 1010
 *                    _id: 61e3514093ae6034b2aebb76
 *                _id: 61e3514093ae6034b2aebb74
 *                orderId: OR-1642287424132
 *                dateCreated: '2022-01-15T22:57:04.132Z'
 *                status: PENDING
 *                __v: 0
 */
const getAllOrders: RequestHandler = async (req: Request, res: Response) => {
  const orders = await Order.find({}).exec();
  return res.status(200).json(orders);
};

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    summary: return details of Orders by orderId
 *    tags: [Orders]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: 'OR-1642286050591'
 *    responses:
 *      200:
 *        description:  Selected Order should be returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              customerInfo:
 *                name: Samztz
 *                email: ante@aol.net
 *              _id: 61e34be239513c2fa3b53baf
 *              products:
 *                - sku: 0948c595-5766-4621-893a-a4b56553aa62
 *                  quantity: 2
 *                  price: 539123
 *                  _id: 61e34be239513c2fa3b53bb0
 *                - sku: 53d08caa-d952-422c-9baf-26539f21e3c1
 *                  quantity: 2
 *                  price: 5391
 *                  _id: 61e34be239513c2fa3b53bb1
 *              orderId: OR-1642286050591
 *              dateCreated: '2022-01-15T22:34:10.591Z'
 *              status: PENDING
 *              __v: 0
 *      '404':
 *        description: Order Not Found
 *        content:
 *          appplication/json:
 *            schema:
 *              type: object
 *            example: 'OR-1642286050591 not found'
 */
const getOrderById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderById = await Order.findOne({ orderId: String(id) });
    if (!orderById) {
      return res.status(404).json({ error: 'order not found' });
    }
    return res.status(200).json(orderById);
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

/**
 * @swagger
 * /orders/{id}:
 *  put:
 *    tags: [Orders]
 *    summary:  Compelete, Reject, Cancel Order
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: 'OR-1642286050591'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          example:
 *            status: 'COMPLETED'
 *    responses:
 *      '200':
 *        description:  Selected Order should be returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              customerInfo:
 *                name: Samztz
 *                email: ante@aol.net
 *              _id: 61e34be239513c2fa3b53baf
 *              products:
 *                - sku: 0948c595-5766-4621-893a-a4b56553aa62
 *                  quantity: 2
 *                  price: 539123
 *                  _id: 61e34be239513c2fa3b53bb0
 *                - sku: 53d08caa-d952-422c-9baf-26539f21e3c1
 *                  quantity: 2
 *                  price: 5391
 *                  _id: 61e34be239513c2fa3b53bb1
 *              orderId: OR-1642286050591
 *              dateCreated: '2022-01-15T22:34:10.591Z'
 *              status: COMPLETED
 *              __v: 0
 *
 */
const updateOrderStatusById: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['COMPLETED', 'CANCELED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ error: 'You are Only Allowed setting Status to COPMELTED, REJECTED, CANCELED' });
  }

  const existOrder = await Order.findOne({ orderId: id }).exec();
  // check if existing order exist
  if (!existOrder) {
    return res.status(404).json({ error: 'order not found.' });
  }
  // check if order status is pending
  if (existOrder.status !== 'PENDING') {
    return res.status(400).json({ error: 'You are Only Allowed to modifed status of PENGDING orders' });
  }

  const order = await Order.findOneAndUpdate({ orderId: id }, { status }, { new: true }).exec();
  return res.status(200).json(order);
};

export { getAllOrders, getOrderById, updateOrderStatusById, createOrder };
