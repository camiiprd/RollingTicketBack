
import mongoose from 'mongoose'; // Asegúrate de que mongoose esté instalado

// Define el esquema del producto
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del producto
  price: { type: Number, required: true }, // Precio del producto
  stock: { type: Number, default: 0 }, // Stock del producto
  description: { type: String }, // Descripción del producto
  category: { type: String }, // Categoría del producto
}, {
  timestamps: true, // Agrega campos de createdAt y updatedAt
});


// Exporta el modelo
export default mongoose.model('Product', productSchema);
