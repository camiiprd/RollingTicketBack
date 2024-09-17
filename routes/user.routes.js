import {Router} from 'express';
import { login, logout, register, deleteUser, getUsers } from '../controllers/user.controller.js';
import {verifyToken} from '../middlewares/verifyToken.js'

const router = Router();

// Routes
router.get('/',  verifyToken,  getUsers);
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
//router.post('/users/:id/role', udpdateUserRole)

router.delete('/:id',deleteUser )
export default router;