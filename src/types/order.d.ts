import Status from '../models';
import Document from 'mongoose';

enum orderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export default interface IOrder extends Document {
  orderId: string;
  customerId: string;
  products: [string];
  dateCreated: Date;
  status: string;
}
