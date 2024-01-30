const express = require("express");
const dotenv = require("dotenv").config();

// const errorHandler = require("./middleware/errorHandler");
// const connectDb = require("./config/dbConnection");

//connectDb();
const { MongoClient } = require('mongodb');
require('dotenv').config();
console.log(process.env.MONGO_URI); 
const app = express();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/users", require("./routes/usersRoutes"));


// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/cards", require("./routes/cardsRoutes"));
// app.use(errorHandler);
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
