import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({});

const Order = mongoose.model('Order', orderSchema);
export default Order;
