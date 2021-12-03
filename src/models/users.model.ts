import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types/users';

const UserSchema = new Schema({
  userId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['staff', 'admin'],
    default: 'staff',
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

UserSchema.pre('save', async function userId(next) {
  this.userId = await uuidv4();
  next();
});

const User = model<IUser>('User', UserSchema);

export default User;
