export interface IProduct { }
import { Document } from "mongoose";

export default interface Iproduct extends Document {
    productId: Number;
    productName: String;
    categoary: String;
    quantity: Number;
    description: "";
}