const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/usersController');

// Path: server/routes/usersRoutes.js

// Get all users
router.route('/').get(getUsers);

// Get an user by id
router.route('/:id').get(getUserById);

// Create an user
router.route('/').post(createUser);

// Update an user
router.route('/:id').put(updateUser);

// Delete an user
router.route('/:id').delete(deleteUser);

module.exports = router;