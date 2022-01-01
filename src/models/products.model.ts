import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IProduct } from 'products';

const productSchema = new Schema({
  productId: {
    type: String,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['computers', 'phones', 'accesories'],
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    default: '',
    type: String,
  },
});

productSchema.pre('save', async function productId(next) {
  this.productId = await uuidv4();
  next();
});

export default model<IProduct>('Product', productSchema);
