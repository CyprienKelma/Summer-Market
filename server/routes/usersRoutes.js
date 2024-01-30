const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/usersController');

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

module.exports = router;
