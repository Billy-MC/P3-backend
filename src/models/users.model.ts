import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from 'users';

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
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

UserSchema.methods.toJSON = function delPassword() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = model<IUser>('User', UserSchema);

export default User;
