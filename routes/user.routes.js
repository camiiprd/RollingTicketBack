import { Router } from 'express';
import { deleteUser, getUsers, login, logout, profile, register, updateUser, verifyToken } from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validatingSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../schemas/validate.schema.js';

const router = Router();

// Rutas 

router.post('/register', validatingSchema(registerSchema), register);
router.post('/login', validatingSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verifyToken', verifyToken)

router.get('/profile', verifyToken, profile)

router.get('/', getUsers)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)



export default router;
