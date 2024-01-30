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

// Fonction pour créer un produit
async function createAnProduct(name, price, photo, number) {

  const newProduct = { name, price, photo, number };
  
  try {
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e; 
  }
}
// Ajouter, supprimer

// Fonction pour récupérer un produit en fonction de son nom
async function findOneById(id) {
  try {
    const db = client.db();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id)});
    return product;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Fonction pour récupérer tout les produits du stock
async function getTheWholeStock() {
  try {
    const db = client.db();
    const products = await db.collection("products").find({}).toArray();
    return {products};
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Fonction pour ajouter un nouveau produit au stock total (collection products)
async function addNewProduct(name, price, photo) {
  const newProduct = { name, price, photo };
  try {
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Fonction pour supprimer un produit du stock total (collection products)
async function deleteAProduct(id) {
  try {
    const db = client.db();
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id)});
    return result.deletedCount;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


// Exporter la fonction
module.exports = {
  createAnProduct,
  findOneById,
  getTheWholeStock,
  addNewProduct,
  deleteAProduct,
  client
};
