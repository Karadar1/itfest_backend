import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller' | 'admin';
  createdAt: Date;
}
