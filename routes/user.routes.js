import {Router} from 'express';
import { login, logout, register, deleteUser } from '../controllers/user.controller.js';

const router = Router();

// router.get('/', (req, res) => {
//     res.send('Hello GET Users!');
//     });
// router.get('/:id', (req, res) => {
//     res.send('Hello User GET ID!');
//     });
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
// router.post('/logout', (req, res) => {
//     res.send('Hello User POST LOGOUT!');
//     });
// router.put('/:id', (req, res) => {
//     res.send('Hello User PUT!');
//     });
router.delete('/:id',deleteUser )
export default router;