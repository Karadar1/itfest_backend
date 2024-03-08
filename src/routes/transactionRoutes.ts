import express from 'express';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController';
import { authenticateToken } from '../middleware/authenticateToken';

const transactionRouter = express.Router();

transactionRouter.get('/', authenticateToken(), getAllTransactions);
transactionRouter.get('/:id', authenticateToken(), getTransactionById);
transactionRouter.post('/', authenticateToken(), createTransaction);
transactionRouter.patch('/:id', authenticateToken(), updateTransaction);
transactionRouter.delete('/:id', authenticateToken(), deleteTransaction);

export default transactionRouter;
