"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const transactionRouter = express_1.default.Router();
transactionRouter.get('/', (0, authenticateToken_1.authenticateToken)(), transactionController_1.getAllTransactions);
transactionRouter.get('/:id', (0, authenticateToken_1.authenticateToken)(), transactionController_1.getTransactionById);
transactionRouter.post('/', (0, authenticateToken_1.authenticateToken)(), transactionController_1.createTransaction);
transactionRouter.patch('/:id', (0, authenticateToken_1.authenticateToken)(), transactionController_1.updateTransaction);
transactionRouter.delete('/:id', (0, authenticateToken_1.authenticateToken)(), transactionController_1.deleteTransaction);
exports.default = transactionRouter;
