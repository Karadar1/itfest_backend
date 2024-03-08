"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res) => {
    if ('status' in err && 'message' in err) {
        logger_1.default.error(`HTTP Error: ${err.status} - ${err.message}`);
        return res.status(err.status).send(err.message);
    }
    logger_1.default.error(`Internal Server Error: ${err.message}`);
    res.status(500).send('Internal Server Error');
};
exports.default = errorHandler;
