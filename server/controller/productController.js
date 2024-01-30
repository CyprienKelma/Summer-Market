const Product = require('../models/productModel');
const User = require('../models/userModel');
const { ObjectId } = require('mongodb');
const { getTheWholeStock, findOneById, createAnProduct, addNewProduct, deleteAProduct } = require('../models/productModel');


const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});


//@desc Get all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await getTheWholeStock();
        res.json(products);
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//@desc Get prduct by id
//@route GET /api/product/:id
//@access Public
const getProductById = asyncHandler(async (req, res, next) => {
    try {
        const actualId = req.params.id;
        const product = await Product.findOneById(new ObjectId(actualId));
        if (product) {
            res.json(product);
        } else {
            const error = new Error('User not found');
            error.status = 404;
            next(error);
        }
    } catch (error) {
        console.error(error); 
        next(error);
    }
});

//@desc Create a product
//@route POST /api/product
//@access Public
const createProduct = asyncHandler(async (req, res, next) => {
try {
    const { name, price, photo, number } = req.body;
    const productId = await Product.createAnProduct(name, price, photo, number);
    res.status(201).json({ message: 'Product created : ', productId });
} catch (e) {
    next(e);
}
});

//@desc Update a product
//@route PUT /api/product/:id
//@access Public
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


//@desc Delete a user
//@route DELETE /api/users/:id
//@access Public
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
