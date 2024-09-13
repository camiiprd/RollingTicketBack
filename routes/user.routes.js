import {Router} from 'express';
import { login, logout, register, deleteUser, getUsers } from '../controllers/user.controller.js';

const router = Router();

// Routes
router.get('/', getUsers);
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

router.delete('/:id',deleteUser )
export default router;