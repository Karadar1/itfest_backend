import mongoose from 'mongoose';
import logger from './utils/logger';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info('Database connected');
  } catch (error) {
    logger.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
