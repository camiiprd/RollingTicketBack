import Purchase from '../models/Purchase.js';

export const getPurchaseHistory = async (req, res) => {
    try {
        const purchases = await Purchase.find({ userId: req.params.userId }).populate('items.productId');
        res.status(200).json(purchases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving purchase history' });
    }
};
