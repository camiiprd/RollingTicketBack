import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello EVENTOS!');
    });
router.get('/:id', (req, res) => {
    res.send('Hello EVENTO ID!');
    });
router.post('/', (req, res) => {
    res.send('Hello EVENTO POST!');
    });
router.put('/:id', (req, res) => {
    res.send('Hello EVENTO PUT!');
    });
router.delete('/:id', (req, res) => {
    res.send('Hello EVENTO DELETE!');
    });

export default router;