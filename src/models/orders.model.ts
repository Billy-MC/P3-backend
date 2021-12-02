import { Schema, model } from 'mongoose';


export enum Status {
    PENDING ,
    COMPLETED,
    CANCELED 
}

export interface IOrder extends Document {
    orderId: string,
    customerId: string,
    products: [string],
    dateCreated: Date,
    status: Status,
}

const orderSchema = new Schema (
    {        
        _id: {
            type: String,
            alias: 'orderId',            
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
            unique: true
        },
        status: {
            type: String,
            required: true,
        }
    }
);

const Order = model<IOrder>('Order', orderSchema);
export default Order
