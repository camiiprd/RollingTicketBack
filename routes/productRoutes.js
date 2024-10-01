import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/mostrar', getProducts);

// Ruta para agregar un nuevo producto
router.post('/add', addProduct);

// Ruta para actualizar un producto existente
router.put('/update/:id', updateProduct);

// Ruta para eliminar un producto
router.delete('/delete/:id', deleteProduct);

export default router;
