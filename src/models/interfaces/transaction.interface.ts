import { Document, ObjectId } from 'mongoose';

export interface ITransaction extends Document {
  _id: ObjectId;
  productId: ObjectId;
  sellerId: ObjectId;
  buyerId: ObjectId;
  transactionType: 'sale' | 'rent';
  transactionDate: Date;
  price: number;
}
