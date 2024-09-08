import category from '../models/category.model.js';

//CREAR CATEGORIA
export const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const newCategory = new category({ name, description, image });
        const categorySaved = await newCategory.save();
        res.status(201).json(categorySaved);
    } catch (error) {
        console.error('Error al crear categoria:', error);
        res.status(500).json({ message: 'Error al crear categoria', error: error.message });
    }
};
//OBTENER CATEGORIAS
export const getCategories = async (req, res) => {
    try {
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener categorias:', error);
        res.status(500).json({ message: 'Error al obtener categorias', error: error.message });
    }
};
//ACTUALIZAR CATEGORIA
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;
        const categoryUpdated = await category.findByIdAndUpdate(id, { name, description, image }, { new: true });
        if (!categoryUpdated) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }
        res.status(200).json(categoryUpdated);
    }
    catch (error) {
        console.error('Error al actualizar categoria:', error);
        res.status(500).json({ message: 'Error al actualizar categoria', error: error.message });
    }
}
//ELIMINAR CATEGORIA
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryFound = await category.findByIdAndDelete(id);
        if (!categoryFound) {
            return res.status(404).json({ message: 'Categoria no encontrada' });
        }
        res.status(200).json({ message: 'Categoria eliminada' });
    } catch (error) {
        console.error('Error al eliminar categoria:', error);
        res.status(500).json({ message: 'Error al eliminar categoria', error: error.message });
    }
}
