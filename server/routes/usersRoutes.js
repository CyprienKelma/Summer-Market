const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/usersController');

// Path: server/routes/usersRoutes.js

// Get all users
router.route('/').get(getUsers);

// Get an user by id
router.route('/:id').get(getUserById);

// Create an user
router.route('/').post((req, res) => {
    res.status(200).json({ 
        message: "Create an user" 
    });
});

// Update an user
router.route('/:id').put((req, res) => {
    res.status(200).json({ 
        message: "Update the user with id of " + req.params.id 
    });
});

// Delete an user
router.route('/:id').delete((req, res) => {
    res.status(200).json({ 
        message: "Delete the user with id of " + req.params.id 
    });
});

module.exports = router;