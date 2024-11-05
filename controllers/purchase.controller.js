import Purchase from '../models/purchase.model.js';

// Crear compra
export const createPurchase = async (req, res) => {
    try {
        const { itemTitle, price, userId, paymentMethod, items, total } = req.body;  // Agrega los nuevos campos
        const newPurchase = new Purchase({ itemTitle, price, userId, paymentMethod, items, total });
        const savedPurchase = await newPurchase.save();
        res.status(201).json(savedPurchase);
    } catch (error) {
        console.error('Error al crear compra:', error);
        res.status(500).json({ message: 'Error al crear compra', error: error.message });
    }
};


// Obtener historial de compras (opcionalmente, filtrar por usuario)
export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('userId', 'name email');
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener compras:', error);
        res.status(500).json({ message: 'Error al obtener compras', error: error.message });
    }
};

// Obtener una compra por ID
export const getPurchaseById = async (req, res) => {
    const { id } = req.params;
    try {
        const purchase = await Purchase.findById(id).populate('userId', 'name email');
        if (purchase) {
            res.status(200).json(purchase);
        } else {
            res.status(404).json({ message: 'Compra no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        res.status(500).json({ message: 'Error al obtener la compra', error: error.message });
    }
};

// Eliminar una compra por ID
export const deletePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const purchase = await Purchase.findByIdAndDelete(id);
        if (purchase) {
            res.status(200).json({ message: 'Compra eliminada' });
        } else {
            res.status(404).json({ message: 'Compra no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la compra:', error);
        res.status(500).json({ message: 'Error al eliminar la compra', error: error.message });
    }
};
