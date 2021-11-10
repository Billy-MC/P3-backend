const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
