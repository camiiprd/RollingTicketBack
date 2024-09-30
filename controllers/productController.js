const Product = require('../models/product.model.js'); // Ajustado para CommonJS

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error });
  }
};

// Agregar un nuevo producto
exports.addProduct = async (req, res) => {
  const { name, price, stock, description, category } = req.body;
  const newProduct = new Product({ name, price, stock, description, category });
  
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar el producto', error: error });
  }
};

// Actualizar un producto existente
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, stock, description, category }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el producto', error: error });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error });
  }
};
