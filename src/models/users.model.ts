import { Schema, model } from 'mongoose';
import { IUser } from '../types/users.d';

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

const User = model<IUser>('User', UserSchema);

export default User;
