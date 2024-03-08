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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const http_errors_1 = __importDefault(require("http-errors"));
const logger_1 = __importDefault(require("../utils/logger"));
const authenticateToken = (role = '') => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return next((0, http_errors_1.default)(401, 'No token provided'));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = yield user_model_1.default.findById(decoded.userId);
            if (!user) {
                return next((0, http_errors_1.default)(403, 'User not found'));
            }
            if (role && user.role !== role) {
                return next((0, http_errors_1.default)(403, 'Action unauthorized'));
            }
            req.user = user;
            next();
        }
        catch (error) {
            logger_1.default.error('Error in token authentication:', error);
            next((0, http_errors_1.default)(403, 'Invalid or expired token'));
        }
    });
};
exports.authenticateToken = authenticateToken;
