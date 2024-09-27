import { Router } from 'express';
import { login, logout, register, deleteUser, getUsers } from '../controllers/user.controller.js';
import { verifyToken, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

// Routes
router.get('/', verifyToken, restrictTo(['admin']), getUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.delete('/:id', verifyToken, restrictTo(['admin']), deleteUser);

export default router;