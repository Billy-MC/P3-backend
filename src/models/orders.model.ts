<<<<<<< HEAD
import mongoose, { Schema } from 'mongoose';
import IOrder from '../types/order.d';
=======
import mongoose, { Schema, Model } from 'mongoose';
import IOrder from '../types/order';
>>>>>>> e3ef1c48e88f7b10cfdcfcbcdd80e5fa9601f9bf

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
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELED'],
    required: true,
  },
});

export default mongoose.model<IOrder>('Order', orderSchema);
