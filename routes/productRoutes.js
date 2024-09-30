import express from 'express';
import { addProduct, updateProduct, deleteProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para agregar un nuevo producto
router.post('/', addProduct);

// Ruta para actualizar un producto existente
router.put('/:id', updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', deleteProduct);

export default router;
