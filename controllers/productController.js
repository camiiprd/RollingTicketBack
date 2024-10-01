import Event from '../models/event.model.js'

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Event.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error });
  }
};

// Agregar un nuevo producto
export const addProduct = async (req, res) => {
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
export const updateProduct = async (req, res) => {
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
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error });
  }
};
