// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model('User', userSchema);
// export default User;

import mongoose, { Schema, Document } from 'mongoose';

export enum Gender {
  male = 'male',
  female = 'female',
  undisclosed = 'undisclosed'
}

export interface Address extends Document {
  street: string;
  city: string;
  postCode: string;
}

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  gender?: Gender;
  address?: Address;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // Gets the Mongoose enum from the TypeScript enum
  gender: { type: String, enum: Object.values(Gender) },
  address: {
    street: { type: String },
    city: { type: String },
    postCode: { type: String }
  }
});

const User = mongoose.model<IUser>('User', UserSchema);
// Export the model and return your IUser interface
export default User;