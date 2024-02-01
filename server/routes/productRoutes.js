const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controller/productController');

// Get all users
router.get('/', getProducts);

// Get an user by id
router.get('/:id', getProductById);

// Create an user
router.post('/', createProduct);

// Update an user
router.put('/:id', updateProduct);

// Delete an user
router.delete('/:id', deleteProduct);




module.exports = router;