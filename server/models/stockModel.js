const { MongoClient } = require('mongodb');
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

// Appeler la fonction de connexion
connectToDatabase();

// Fonction pour créer un utilisateur
async function createAnStock(name) {
  const newStock = { 
    name, 
    list: []   
  };
  
  try {
    const db = client.db(); // Utiliser la base de données par défaut
    const result = await db.collection("stocks").insertOne(newStock); // Utiliser la collection "stocks"
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e; // Relayer l'erreur
  }
}

// Fonction pour récupérer tout les utilisateurs
async function getAllStocks() {
  try {
    const db = client.db();
    const stocks = await db.collection("stocks").find({}).toArray();
    return {stocks};
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Fonction pour récupérer un utilisateur par son id
async function findOneById(id) {
  try {
    const db = client.db();
    const stock = await db.collection("stocks").findOne({ _id: new ObjectId(id) });
    return stock;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Exporter la fonction
module.exports = {
  createAnStock,
  getAllStocks,
  findOneById,
  client
};
