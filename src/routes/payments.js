// File: routes/payments.js
import express from 'express';
import { createPayment, verifyPayment } from '../controllers/paymentController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All payment routes require authentication
router.use(auth);

router.post('/create', createPayment);
router.post('/verify', verifyPayment);

export default router;
