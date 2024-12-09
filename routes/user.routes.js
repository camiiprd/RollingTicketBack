import { Router } from 'express';
import { login, logout, profile, register } from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validatingSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../schemas/validate.schema.js';

const router = Router();

// Rutas públicas
router.post('/register', validatingSchema(registerSchema), register);
router.post('/login', validatingSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile)

// Rutas protegidas por token


export default router;
