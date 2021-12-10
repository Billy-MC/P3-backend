import mongoose, { model, Schema } from "mongoose";
import { IProduct } from "src/types/products";
import { v4 as uuidv4 } from "uuid";

const productSchema = new Schema({
    productId: {
        type: String,
        default: function genUUID(){
            return uuidv4();
        },
        unique: true,
        sparse: true,
    },
    productName: {
        type: String,
        required: true,
    },
    categoary: {
        type: String,
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
})

export default mongoose.model<IProduct>('Product', productSchema);
