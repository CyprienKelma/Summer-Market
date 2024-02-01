const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser, 
        updateUserWallet, addProductToCart,
        removeProductFromCart, finalizePayment 
    } = require('../controller/usersController');


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

// Mettre à jour le portefeuille de l'utilisateur
router.put('/:id/wallet', updateUserWallet);

// Ajouter un produit au panier de l'utilisateur
router.post('/:id/cart', addProductToCart);

// Supprimer un produit du panier de l'utilisateur
router.delete('/:id/cart', removeProductFromCart);

// Finaliser le paiement
router.post('/:id/finalize-payment', finalizePayment);

module.exports = router;
