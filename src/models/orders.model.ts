import { Schema, model } from 'mongoose';
import IOrder from '../types/order';

const orderSchema = new Schema({
  orderId: {
    type: String,
    unique: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  products: {
    type: [String],
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELED'],
    required: true,
  },
});

orderSchema.pre('save', async function orderId(next) {
  const now: number = await new Date().getTime();
  this.orderId = await `OR-${now}`;
  next();
});
const Order = model<IOrder>('Order', orderSchema);

export default Order;
