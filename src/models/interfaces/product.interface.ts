import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  price: number;
  category: 'bicycle' | 'scooter';
  condition: 'new' | 'used';
  imageUrl: string[];
  createdAt: Date;
}
