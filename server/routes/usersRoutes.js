const express = require('express');
const router = express.Router();

// Path: server/routes/usersRoutes.js

// Get all users
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Get all users" });
});

// Get an user by id
router.route('/:id').get((req, res) => {
    res.status(200).json({ 
        message: "Get user with id of " + req.params.id 
    });
});

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