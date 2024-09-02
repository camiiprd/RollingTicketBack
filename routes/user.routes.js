import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello GET Users!');
    });
router.get('/:id', (req, res) => {
    res.send('Hello User GET ID!');
    });
router.post('/register', (req, res) => {
    res.send('Hello User POST REGISTER!');
    });
router.post('/login', (req, res) => {
    res.send('Hello User POST LOGIN!');
    });
router.post('/logout', (req, res) => {
    res.send('Hello User POST LOGOUT!');
    });
router.put('/:id', (req, res) => {
    res.send('Hello User PUT!');
    });
router.delete('/:id', (req, res) => {
    res.send('Hello User DELETE!');
    });
export default router;