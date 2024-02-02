const express = require('express');
const router = express.Router();
const { getUsers, getUserById,getUserWallet, createUser, updateUser, deleteUser, updateUserWallet, addProductToCart, removeProductFromCart } = require('../controller/usersController');


// Get all users
router.get('/', getUsers);

// Get an user by id
router.get('/:id', getUserById);

// Create an user
router.post('/', createUser);

// Update an user
router.put('/:id', updateUser);

// Delete an user
router.delete('/:id', deleteUser);

// Get user wallet by id
router.get('/wallet/:email', getUserWallet);

// Ajouter un produit au panier de l'utilisateur
router.post('/:id/cart', addProductToCart);

// Supprimer un produit du panier de l'utilisateur
router.delete('/:id/cart', removeProductFromCart);

// Finaliser le paiement
router.post('/:id/finalize-payment', finalizePayment);

module.exports = router;
