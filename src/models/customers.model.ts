import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  notification: {
    type: [String],
    enum: ['SMS', 'phone', 'email'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'undisclosed'],
  },
  address: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String },
  },
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
