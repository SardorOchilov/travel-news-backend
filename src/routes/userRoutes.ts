// src/routes/userRoutes.ts

import { Router } from 'express';
import { register } from '../controllers/userController';
import { login } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
