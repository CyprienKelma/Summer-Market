const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

// Configurer les paramètres de connexion à la base de données
const mongoURI = process.env.MONGO_URI;

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
  const hashedPassword = await bcrypt.hash(password, 10); // Add this line
  const newUser = { 
    name, 
    email, 
    password: hashedPassword, // Use the hashed password
    wallet: 0, 
    cart: []   
  };
  
  try {
    const db = client.db(); // Utiliser la base de données par défaut
    // Insère le nouvel utilisateur dans la collection "users" de la db :
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

async function authenticateUser(email, password) {
  try {
    const db = client.db();
    const user = await db.collection("users").findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      return user; // Authenticated
    } else {
      return null; // Authentication failed
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function addToCart(userId, item) {
  try {
    const db = client.db();
    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $push: { cart: item } }
    );
    console.log("AddCart4");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

async function updateUserWallet(userId, amount) {
  try {
    const db = client.db(); // Assurez-vous d'avoir une instance de MongoClient connectée à votre DB
    // Convertissez userId en ObjectId si ce n'est pas déjà fait
    const userObjectId = typeof userId === 'string' ? new ObjectId(userId) : userId;

    // Trouvez l'utilisateur et mettez à jour son portefeuille
    const result = await db.collection('users').findOneAndUpdate(
      { _id: userObjectId },
      { $inc: { wallet: amount } }, // Utilisez $inc pour augmenter le portefeuille de l'utilisateur par le montant
      { returnDocument: 'after' } // Option pour retourner le document après mise à jour
    );

    if (result.ok && result.value) {
      return result.value; // Retourne l'utilisateur mis à jour
    } else {
      throw new Error('Utilisateur non trouvé ou mise à jour échouée');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du portefeuille de l\'utilisateur:', error);
    throw error; // Relancez l'erreur pour la gestion d'erreur externe
  }
}

// Exporter la fonction
module.exports = {
  createAnUser,
  getAllUsers,
  findOneById,
  authenticateUser,
  addToCart,
  updateUserWallet,
  client
};
