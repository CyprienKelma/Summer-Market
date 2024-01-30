const express = require('express');
const router = express.Router();
const { createUser } = require('../models/userModel'); // Ajustez le chemin d'accès selon la structure de votre projet

// Parse le corps des requêtes JSON entrantes
router.use(express.json());

// Route pour créer un nouvel utilisateur
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = await createUser(name, email, password);
    res.status(201).json({ message: "User created", userId });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
