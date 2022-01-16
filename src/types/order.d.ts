import Document from 'mongoose';

export interface IProduct {
  sku: string;
  quantity: number;
  price: number;
}
export interface ICustomerInfo {
  name: { type: string };
  email: { type: string };
}

enum orderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}

export default interface IOrder extends Document {
  orderId: string;
  customerInfo: ICustomerInfo;
  products: IProduct[];
  dateCreated: Date;
  status: orderStatus;
}
