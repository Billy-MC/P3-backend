import { stubTrue } from "lodash";
import mongoose, { model, Schema } from "mongoose";
import { IProduct } from "src/types/products";

const productSchema = new Schema({
    productId: {
        type: Number,
        unique: true,
        required: true,
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
