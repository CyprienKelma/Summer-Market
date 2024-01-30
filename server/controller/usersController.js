const User = require('../models/userModel');
const { ObjectId } = require('mongodb');
const { createAnUser, getAllUsers, findOneById, client } = require('../models/userModel');
const Product = require('../models/productModel'); // Assurez-vous que le chemin d'accès est correct
const { adjustStockQuantity } = require('../models/stockModel');



const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);

    console.error(err.message);
    console.error(err.stack);

    res.status(500).json({ message: 'Internal Server Error' });
});


//@desc Get all users
//@route GET /api/users
//@access Public
const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//@desc Get user by id
//@route GET /api/users/:id
//@access Public
const getUserById = asyncHandler(async (req, res, next) => {
    try {
        const actualId = req.params.id;
        const user = await User.findOneById(new ObjectId(actualId));
        if (user) {
            res.json(user);
      } else {
        const error = new Error('User not found ' + actualId);
        error.status = 404;
        next(error);
      }
    } catch (error) {
      console.error(error); // Affiche l'erreur dans la console
      next(error);
    }
  });

//@desc Create a user
//@route POST /api/users
//@access Public
const createUser = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userId = await User.createAnUser(name, email, password);
        res.status(201).json({ message: 'User created', userId, wallet: 0, cart: [] });
    } catch (e) {
        next(e); 
    }
});

//@desc Update a user
//@route PUT /api/users/:id
//@access Public
const updateUser = asyncHandler(async (req, res, next) => {
try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
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
const deleteUser = asyncHandler(async (req, res, next) => {
try {
    const user = await User.findById(req.params.id);
    if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
    } else {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
    }
} catch (e) {
    next(e);
}
});

const updateUserWallet = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { wallet } = req.body; // Nouvelle valeur pour le portefeuille

    const db = client.db();
    const updatedUser = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { wallet: wallet } }
    );

    if (updatedUser.modifiedCount === 0) throw new Error("User not found or wallet unchanged");

    res.json({ message: 'Wallet updated', wallet });
  } catch (e) {
    next(e);
  }
});

const addProductToCart = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body; // ID du produit à ajouter

    const db = client.db();
    const productCollection = db.collection('products');
    const userCollection = db.collection('users');

    // Vérifiez si le produit existe
    const productExists = await productCollection.findOne({ _id: new ObjectId(productId) });

    if (!productExists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Vérifiez si l'utilisateur existe
    const userExists = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ajoutez le produit au panier de l'utilisateur
    const updatedUser = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { cart: productId } } // Utilisez $addToSet pour éviter les doublons
    );

    if (updatedUser.modifiedCount === 0) {
      throw new Error("Product not added to cart");
    }

    res.json({ message: 'Product added to cart', productId });
    await adjustStockQuantity(productId, -1);
  } catch (e) {
    next(e);
  }
});


const removeProductFromCart = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body; // ID du produit à supprimer

    const db = client.db();
    const updatedUser = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { cart: productId } }
    );

    if (updatedUser.modifiedCount === 0) throw new Error("User not found or product not in cart");

    res.json({ message: 'Product removed from cart', productId });
  } catch (e) {
    next(e);
  }
});


module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, updateUserWallet, addProductToCart, removeProductFromCart };
