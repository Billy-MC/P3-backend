import Status from '../models';
import Document from 'mongoose';

enum status_enum {
  PENDING,
  COMPLETED,
  CANCELED,
}
type Status = keyof typeof status_enum;

export default interface IOrder extends Document {
  orderId: string;
  customerId: string;
  products: [string];
  dateCreated: Date;
  status: Status;
}
