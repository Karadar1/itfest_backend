import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authenticateToken } from '../middleware/authenticateToken';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', authenticateToken(), createProduct);
productRouter.patch('/:id', authenticateToken(), updateProduct);
productRouter.delete('/:id', authenticateToken(), deleteProduct);

export default productRouter;
