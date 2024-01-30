const express = require('express');
const router = express.Router();
const { addProductToStock, updateStockOnPurchase } = require('../controller/stockController');

// Créer un élément de stock
router.post('/', addProductToStock);

// Mettre à jour le stock lors d'un achat
router.put('/purchase', updateStockOnPurchase);

module.exports = router;
