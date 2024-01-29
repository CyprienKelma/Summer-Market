const express = require("express");
const router = express.Router();

// Get all users
router.route("/").get((req, res) => {
    res.json({ 
        message: "get users works" 
    });
});

// Get a selected users
router.route("/:id").get((req, res) => {
    res.json({ 
        message: `get user ${req.params.id} works` 
    });
});

// Create a new user
router.route("/").post((req, res) => {
    res.json({ 
        message: "post user works" 
    });
});

// Update a user
router.route("/:id").put((req, res) => {
    res.json({ 
        message: `put user ${req.params.id} works` 
    });
});

// Delete a user
router.route("/:id",).delete((req, res) => {
    res.json({ 
        message: `delete user ${req.params.id} works` 
    });
});

// Export the router
module.exports = router;