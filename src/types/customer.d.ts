import Document from 'mongoose';

interface Address extends Document {
  street?: string;
  city: string;
  postcode: string;
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  NOTTOTELL = 'NOTTOTELL',
}

enum Notification {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export interface ICustomer extends Document {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: Date;
  notification?: Notification;
  gender: Gender;
  address: Address;
  spending?: number;
}
