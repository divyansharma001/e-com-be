// File: routes/cart.js
import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../controllers/cartController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(auth);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:id', updateCartItem);
router.delete('/remove/:id', removeCartItem);
router.delete('/clear', clearCart);

export default router;