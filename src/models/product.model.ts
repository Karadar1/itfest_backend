import mongoose from 'mongoose';
import { IProduct } from './interfaces/product.interface';

const productSchema = new mongoose.Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['bicycle', 'scooter'], required: true },
  condition: { type: String, enum: ['new', 'used'], required: true },
  imageUrl: [String],
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
