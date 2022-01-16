import { Schema, model } from 'mongoose';
import IOrder from 'order';

const product = new Schema({
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, default: 0 },
});

const orderSchema = new Schema({
  orderId: {
    type: String,
    unique: true,
    index: true,
  },
  customerInfo: {
    name: { type: String },
    email: { type: String },
  },
  products: [product],
  dateCreated: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELED', 'REJECTED'],
  },
});

orderSchema.pre('save', async function orderId(next) {
  const now: number = await new Date().getTime();
  this.orderId = await `OR-${now}`;
  this.dateCreated = await now;
  this.status = await 'PENDING';
  next();
});
const Order = model<IOrder>('Order', orderSchema);

export default Order;
