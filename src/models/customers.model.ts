import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
