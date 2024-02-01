
const Product = require('../models/productModel');
const User = require('../models/userModel');
const { ObjectId } = require('mongodb');
const { createStockItem, adjustStockQuantity, getTheWholeStock} = require('../models/stockModel');


const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);

    console.error(err.message);
    console.error(err.stack);

    res.status(500).json({ message: 'Internal Server Error' });
});

const getStockItems = asyncHandler(async (req, res, next) => {
  try {
    const items = await getTheWholeStock(); // Vous devrez créer cette méthode dans stockModel.js
    res.json(items);
  } catch (e) {
    next(e);
  }
});

const addProductToStock = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  // Vous devez vérifier si le productId est valide et si le produit existe.
  const product = await Product.findOneById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Ensuite, mettez à jour le stock.
  const updatedStock = await adjustStockQuantity(productId, quantity);
  if (updatedStock.modifiedCount === 0) {
    return res.status(500).json({ message: 'Failed to update stock' });
  }

  res.status(200).json({ message: 'Stock updated', updatedStock });
});

const updateStockOnPurchase = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  await adjustStockQuantity(productId, -1); // Réduit le stock de 1
  res.json({ message: 'Stock updated' });
});

module.exports = {
  addProductToStock,
  updateStockOnPurchase,
  getStockItems
};
