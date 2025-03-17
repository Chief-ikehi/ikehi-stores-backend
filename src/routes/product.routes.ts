import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateProductDto, UpdateProductDto } from '../validators/product.validator';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (admin only)
router.post('/', authenticate, validateRequest(CreateProductDto), createProduct);
router.put('/:id', authenticate, validateRequest(UpdateProductDto), updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router; 