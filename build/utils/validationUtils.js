"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.validateTransaction = exports.validateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
const validateProduct = (productData) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        category: joi_1.default.string().valid('bicycle', 'scooter').required(),
        condition: joi_1.default.string().valid('new', 'used').required(),
        imageUrl: joi_1.default.array().items(joi_1.default.string()),
        createdAt: joi_1.default.date(),
    });
    return schema.validate(productData);
};
exports.validateProduct = validateProduct;
const validateTransaction = (transactionData) => {
    const schema = joi_1.default.object({
        productId: joi_1.default.string().required(),
        sellerId: joi_1.default.string().required(),
        buyerId: joi_1.default.string().required(),
        transactionType: joi_1.default.string().valid('sale', 'rent').required(),
        transactionDate: joi_1.default.date().default(() => new Date()),
        price: joi_1.default.number().required(),
    });
    return schema.validate(transactionData);
};
exports.validateTransaction = validateTransaction;
const validateUser = (userData) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .min(8)
            .regex(/(?=.*\d)(?=.*[!@#$%^&*])/)
            .message('Password must be at least 8 characters long, with at least one number and one special character')
            .required(),
        role: joi_1.default.string().valid('buyer', 'seller', 'admin').required(),
    });
    return schema.validate(userData);
};
exports.validateUser = validateUser;
