import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({});

const Product = mongoose.model('Customer', productSchema);
module.exports = Product;
