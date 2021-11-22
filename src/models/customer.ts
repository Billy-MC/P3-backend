import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
