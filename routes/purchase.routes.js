import express from 'express';
import {  createPurchase  } from '../controllers/purchase.controller.js';

const router = express.Router();

// Ruta para crear una nueva compra
router.post('/purchases', createPurchase); 

export default router;
