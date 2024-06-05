// src/routes/adminRoutes.ts

import { Router } from 'express';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';
import { getUserProfile } from '../controllers/userController';

const router = Router();

router.get('/profile', authenticateToken, isAdmin, getUserProfile);

export default router;
