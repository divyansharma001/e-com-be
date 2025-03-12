// File: routes/users.js
import express from 'express';
import { getProfile, updateProfile, deleteAccount } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All user routes require authentication
router.use(auth);

router.get('/me', getProfile);
router.put('/me', updateProfile);
router.delete('/me', deleteAccount);

export default router;