const Cart = require('../models/Cart');

// Add or update a product in the cart
exports.addProductToCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cartItem = await Cart.incrementQuantity(userId, productId);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product from the cart
exports.deleteProductFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await Cart.deleteProduct(userId, productId);
        res.status(200).json({ message: 'Product deleted from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all cart items for a user
exports.getCartItems = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [Product], // To include product details in the response
        });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
