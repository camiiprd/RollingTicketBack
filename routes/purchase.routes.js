import express from 'express';
import { getPurchaseHistory } from '../controllers/purchase.controller.js';

const router = express.Router();

router.get('/history/:userId', getPurchaseHistory);

export default router;
