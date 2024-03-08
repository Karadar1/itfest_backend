"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const productRouter = express_1.default.Router();
productRouter.get('/', productController_1.getAllProducts);
productRouter.get('/:id', productController_1.getProductById);
productRouter.post('/', (0, authenticateToken_1.authenticateToken)(), productController_1.createProduct);
productRouter.patch('/:id', (0, authenticateToken_1.authenticateToken)(), productController_1.updateProduct);
productRouter.delete('/:id', (0, authenticateToken_1.authenticateToken)(), productController_1.deleteProduct);
exports.default = productRouter;
