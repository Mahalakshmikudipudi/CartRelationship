const express = require('express');
const { addProductToCart, deleteProductFromCart, getCartItems } = require('../controllers/cartController');

const router = express.Router();

// Route to add or update a product in the cart
router.post('/cart', addProductToCart);

// Route to delete a product from the cart
router.delete('/cart', deleteProductFromCart);

// Route to get all cart items for a user
router.get('/cart/:userId', getCartItems);

module.exports = router;
