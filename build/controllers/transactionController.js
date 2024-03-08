"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactionById = exports.getAllTransactions = void 0;
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const validationUtils_1 = require("../utils/validationUtils");
const logger_1 = __importDefault(require("../utils/logger"));
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_model_1.default.find();
        res.json(transactions);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error('Error fetching all transactions:', message);
        res.status(500).send('Internal Server Error');
    }
});
exports.getAllTransactions = getAllTransactions;
const getTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transaction_model_1.default.findById(req.params.id);
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }
        res.json(transaction);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error(`Error fetching transaction by ID ${req.params.id}: ${message}`);
        res.status(500).send('Internal Server Error');
    }
});
exports.getTransactionById = getTransactionById;
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, validationUtils_1.validateTransaction)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const transaction = new transaction_model_1.default(req.body);
        const newTransaction = yield transaction.save();
        res.status(201).json(newTransaction);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error('Error creating transaction:', message);
        res.status(500).send('Internal Server Error');
    }
});
exports.createTransaction = createTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, validationUtils_1.validateTransaction)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const transaction = yield transaction_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }
        res.json(transaction);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error(`Error updating transaction ID ${req.params.id}: ${message}`);
        res.status(500).send('Internal Server Error');
    }
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transaction_model_1.default.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).send('Transaction not found');
        }
        res.send('Transaction deleted');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error(`Error deleting transaction ID ${req.params.id}: ${message}`);
        res.status(500).send('Internal Server Error');
    }
});
exports.deleteTransaction = deleteTransaction;
