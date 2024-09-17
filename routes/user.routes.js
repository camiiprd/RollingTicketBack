import {Router} from 'express';
import { login, logout, register, deleteUser, getUsers } from '../controllers/user.controller.js';
import { verifyRole } from '../middlewares/verifyToken.js';


const router = Router();

// Routes
router.get('/', verifyRole(['admin']), getUsers)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
//router.post('/users/:id/role', udpdateUserRole)

router.delete('/:id',deleteUser )
export default router;