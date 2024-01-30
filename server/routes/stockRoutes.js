const express = require('express');
const router = express.Router();
const { getStocks, createStock, getStockById, updateStock, deleteStock } = require('../controller/productController');

// Get all stocks
router.get('/', getStocks);

// Get an stock by id
router.get('/:id', getStockById);

// Create an stock
router.post('/', createStock);

// Update an stock
router.put('/:id', updateStock);

// Delete an stock
router.delete('/:id', deleteStock);

module.exports = router;