import mongoose from 'mongoose';
import { ITransaction } from './interfaces/transaction.interface';

const transactionSchema = new mongoose.Schema<ITransaction>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transactionType: { type: String, enum: ['sale', 'rent'], required: true },
  transactionDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
});

const Transaction = mongoose.model<ITransaction>(
  'Transaction',
  transactionSchema
);
export default Transaction;
