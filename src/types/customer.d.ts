import Document from 'mongoose';

interface Address extends Document {
    street?: string;
    city: string;
    postCode: string;
}

export interface ICustomer extends Document {
    customerId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    dob: Date;
    notification?: Notification;
    gender: Gender;
    address: Address;
}