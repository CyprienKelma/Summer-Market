const User = require('../models/userModel');
const { ObjectId } = require('mongodb');
const { createAnUser, getAllUsers, findOneById } = require('../models/userModel');



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
        res.status(201).json({ message: 'User created', userId });
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

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
