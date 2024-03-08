import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import logger from './utils/logger';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';
import connectDB from './db';
import productRouter from './routes/productRoutes';
import transactionRouter from './routes/transactionRoutes';
import userRouter from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(cors());
// Morgan setup for logging HTTP requests
app.use(
  morgan('tiny', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }),
);

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/products', productRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/users', userRouter);

// Connect to the database
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Centralized error handling
app.use((err: Error, req: Request, res: Response) => {
  logger.error(err.message);
  errorHandler(err, req, res);
});

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`);
});
