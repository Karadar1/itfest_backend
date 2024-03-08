import Transaction from '../models/transaction.model';
import { Request, Response } from 'express';
import { validateTransaction } from '../utils/validationUtils';
import logger from '../utils/logger';

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error fetching all transactions:', message);
    res.status(500).send('Internal Server Error');
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }
    res.json(transaction);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(
      `Error fetching transaction by ID ${req.params.id}: ${message}`,
    );
    res.status(500).send('Internal Server Error');
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { error } = validateTransaction(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const transaction = new Transaction(req.body);
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error creating transaction:', message);
    res.status(500).send('Internal Server Error');
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  const { error } = validateTransaction(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }
    res.json(transaction);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error updating transaction ID ${req.params.id}: ${message}`);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }
    res.send('Transaction deleted');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error deleting transaction ID ${req.params.id}: ${message}`);
    res.status(500).send('Internal Server Error');
  }
};
