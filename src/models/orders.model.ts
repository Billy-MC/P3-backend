import { Schema, model } from 'mongoose';
import IOrder from '../types/order.d';

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
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
    unique: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELED'],
    required: true,
  },
});

export default model<IOrder>('Order', orderSchema);
