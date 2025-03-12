// File: routes/products.js
import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Optional admin routes (not in original spec but useful)
// router.post('/', auth, createProduct);
// router.put('/:id', auth, updateProduct);
// router.delete('/:id', auth, deleteProduct);

export default router;