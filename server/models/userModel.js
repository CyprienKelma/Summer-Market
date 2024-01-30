const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

// Configurer les paramètres de connexion à la base de données
const mongoURI = 'mongodb+srv://dev:dw51C9TsRCY5AsCN@cluster0.gog9niz.mongodb.net';

// Créer une instance du client MongoDB
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connecter le client à la base de données
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

// Appele la fonction de connexion
connectToDatabase();

// Fonction pour créer un utilisateur
async function createAnUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { 
    name, 
    email, 
    password: hashedPassword, 
    wallet: 0, 
    cart: []   
  };
  
  try {
    const db = client.db(); // Utiliser la base de données par défaut
    const result = await db.collection("users").insertOne(newUser); // Utiliser la collection "users"
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e; // Relayer l'erreur
  }
}

// Fonction pour récupérer tout les utilisateurs
async function getAllUsers() {
  try {
    const db = client.db();
    const users = await db.collection("users").find({}).toArray();
    return {users};
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Fonction pour récupérer un utilisateur par son id
async function findOneById(id) {
  try {
    const db = client.db();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Exporter la fonction
module.exports = {
  createAnUser,
  getAllUsers,
  findOneById,
  client
};
