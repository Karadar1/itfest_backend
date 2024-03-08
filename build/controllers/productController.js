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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const validationUtils_1 = require("../utils/validationUtils");
const http_errors_1 = __importDefault(require("http-errors"));
const logger_1 = __importDefault(require("../utils/logger"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
        res.json(products);
    }
    catch (error) {
        logger_1.default.error('Error fetching all products:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(req.params.id);
        if (!product) {
            throw (0, http_errors_1.default)(404, 'Product not found');
        }
        res.json(product);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const status = error instanceof http_errors_1.default.HttpError ? error.status : 500;
        logger_1.default.error(`Error fetching product by ID ${req.params.id}: ${message}`);
        res.status(status).send(message);
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, validationUtils_1.validateProduct)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const newProduct = new product_model_1.default(req.body);
        yield newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error('Error creating product:', message);
        res.status(500).send('Internal Server Error');
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, validationUtils_1.validateProduct)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const product = yield product_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error(`Error updating product ID ${req.params.id}: ${message}`);
        res.status(500).send('Internal Server Error');
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send('Product deleted');
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        logger_1.default.error(`Error deleting product ID ${req.params.id}: ${message}`);
        res.status(500).send('Internal Server Error');
    }
});
exports.deleteProduct = deleteProduct;
