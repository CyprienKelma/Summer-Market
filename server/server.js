const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
console.log(process.env.MONGO_URI); 
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDB(); // Établir la connexion à la base de données au démarrage du serveur
});

module.exports = client; // Exporter le client pour l'utiliser ailleurs dans l'application
