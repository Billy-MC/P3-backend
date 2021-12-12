import { Schema, model } from 'mongoose';
import { ICustomer } from '../types/customer';
import { v4 as uuidv4 } from "uuid";

const CustomerSchema = new Schema({
  customerId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  notification: {
    type: [String],
    enum: ['SMS', 'phone', 'email']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'undisclosed']
  },
  address: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String }
  }
});

CustomerSchema.pre('save', async function customerId(next) {
  this.customerId = await uuidv4();
  next();
});


const Customer = model<ICustomer>('Customer', CustomerSchema);

export default Customer;