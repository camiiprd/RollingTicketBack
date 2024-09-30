import Purchase from '../models/purchase.model.js';

export const createPurchase = async (req, res) => {
    const { items, total, userId } = req.body;
    
    try {
        const newPurchase = new Purchase({
            userId,
            items,
            total
        });

        await newPurchase.save();
        res.status(201).json({ message: 'Compra realizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la compra' });
    }
};

