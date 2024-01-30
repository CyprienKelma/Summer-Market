const User = require('../models/productModel');


const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});



const getProducts = asyncHandler(async (req, res) => {
const products = await User.find({});
res.json(products);
});


const getProductById = asyncHandler(async (req, res, next) => {
const product = await Product.findById(req.params.id);
if (product) {
    res.json(product);
} else {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
}
});


const createProduct = asyncHandler(async (req, res, next) => {
try {
    const { name, price, photo } = req.body;
    const productId = await User.createAnProduct(name, price, photo);
    res.status(201).json({ message: 'Product created', productId });
} catch (e) {
    next(e);
}
});


const updateProduct = asyncHandler(async (req, res, next) => {
try {
    const { name, price, photo } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
    product.name = name;
    product.price = price;
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
    } else {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
    }
} catch (e) {
    next(e);
}
});


const deleteProduct = asyncHandler(async (req, res, next) => {
try {
    const product = await Product.findById(req.params.id);
    if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
    } else {
    const error = new Error('Product not found');
    error.status = 404;
    next(error);
    }
} catch (e) {
    next(e);
}
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
