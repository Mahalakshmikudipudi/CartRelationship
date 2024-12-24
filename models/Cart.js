const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
}, {
    timestamps: false, // No need for timestamps in the cart table
});

// Establish associations
User.hasMany(Cart, { foreignKey: 'user_id' });
Product.hasMany(Cart, { foreignKey: 'product_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Product, { foreignKey: 'product_id' });

// Check if the product exists in the user's cart
Cart.checkIfExists = async function(userId, productId) {
    return await Cart.findOne({
        where: { user_id: userId, product_id: productId },
    });
};

// Increment the quantity of a product in the cart
Cart.incrementQuantity = async function(userId, productId) {
    const cartItem = await Cart.checkIfExists(userId, productId);
    if (cartItem) {
        // If product exists, increment the quantity
        return await cartItem.increment('quantity', { by: 1 });
    } else {
        // Otherwise, create a new record with quantity 1
        return await Cart.create({ user_id: userId, product_id: productId, quantity: 1 });
    }
};

// Delete a product from the cart
Cart.deleteProduct = async function(userId, productId) {
    const cartItem = await Cart.checkIfExists(userId, productId);
    if (cartItem) {
        return await cartItem.destroy();
    }
    throw new Error('Product not found in cart');
};

module.exports = Cart;
