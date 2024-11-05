import express from 'express';
import { createPurchase, getPurchases, getPurchaseById, deletePurchase } from '../controllers/purchase.controller.js';

const router = express.Router();

router.post('/', createPurchase);            // Crear una compra
router.get('/', getPurchases);               // Obtener todas las compras
router.get('/:id', getPurchaseById);        // Obtener una compra por ID
router.delete('/:id', deletePurchase);      // Eliminar una compra por ID

export default router;
