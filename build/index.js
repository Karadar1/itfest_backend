"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Morgan setup for logging HTTP requests
app.use((0, morgan_1.default)('tiny', {
    stream: {
        write: (message) => logger_1.default.info(message.trim()),
    },
}));
// Body parser middleware
app.use(express_1.default.json());
// Routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/transactions', transactionRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
// Connect to the database
(0, db_1.default)();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Centralized error handling
app.use((err, req, res) => {
    logger_1.default.error(err.message);
    (0, errorHandler_1.default)(err, req, res);
});
const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
    logger_1.default.info(`Server running on http://localhost:${port}`);
});
