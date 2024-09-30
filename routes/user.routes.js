import { Router } from 'express';
import { register, login, logout, deleteUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { restrictTo, verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Rutas protegidas por token
router.get('/users',verifyToken, restrictTo(['admin']), getUsers);
router.delete('/user/:id', verifyToken, deleteUser);
router.put('/user/:id', verifyToken, updateUser);

export default router;
