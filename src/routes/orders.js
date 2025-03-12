// File: routes/orders.js
import express from 'express';
import { getMyOrders, getOrderById, createOrder } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(auth);

router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);

export default router;
