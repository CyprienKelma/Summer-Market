const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db"); // Importer la fonction de connexion
const productRoutes = require('./routes/productRoutes');; // Assurez-vous que le chemin est correct
const stockRoutes = require("./routes/stockRoutes"); // Assurez-vous que le chemin d'accès est correct
const User = require('./models/userModel');
const Product = require('./models/productModel')
const Stock = require('./models/stockModel'); 
const path = require('path');
const { ObjectId } = require('mongodb');
const { getTheWholeStock, findOneById, createAnProduct, addNewProduct, deleteAProduct } = require('./models/productModel');




// Pour avoir le serveur en https :
const https = require('https');
const fs = require('fs');

// Charge les certificats auto-signés :
const privateKey = fs.readFileSync('../certif/server.key', 'utf8');
const certificate = fs.readFileSync('../certif/server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const port = process.env.PORT || 5001;
app.use(cors())
app.use(express.json());
app.use("/api/users", require("./routes/usersRoutes"));
app.use('/api/products', require("./routes/productRoutes")); // Utiliser '/api/products' comme base pour les routes de produits
app.use('/api/stock', stockRoutes);



app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


// Crée un serveur HTTPS :
const httpsServer = https.createServer(credentials, app);



// Établit la connexion à la base de données au démarrage du serveur :
connectDB(process.env.MONGO_URI)
  .then(() => {
    // Start the HTTPS server
    httpsServer.listen(port, () => {
      console.log(`Server is running on https://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
    process.exit();
  });

// connectDB(process.env.MONGO_URI).then(() => {
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });
// }).catch(err => {
//   console.error('Database connection failed', err);
//   process.exit();
// });


// * **************** Add par Hugo
app.post("/api/users", async (req, res) => {
  try {
      console.log(req.body)
      const { username, email, password } = req.body;
      console.log(`${username} ${email} ${password}`)
      const userId = await User.createAnUser(username, email, password);
      res.status(201).json({ message: 'User created', userId, wallet: 0, cart: [] });
  } catch (e) {
      console.log(e); 
  }
});
// *****************

/*** Login requete */


app.post("/api/products", async (req, res) => {
  try {
    const { image, price, name, description, qrcode } = req.body;
    console.log( image + price + name + description + qrcode)
    const productId = await Product.createAnProduct(image, price, name, description, qrcode);
    res.send('Product created');
  } catch (e) {
    console.log("?????")
      next(e);
  }
});
// *****************

/*** Login requete */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Assuming there's a method in the User model to authenticate a user
    const user = await User.authenticateUser(email, password);
    
    if (user) {
      // Here you would typically create a token or a session
      // and return it to the client. For simplicity, we're just
      // sending a message back.
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (e) {
    res.status(500).json({ message: "An error occurred during the login process." });
    console.log(e);
  }
});

// ajout article 

app.post("/api/cart/add", async (req, res) => {
  try {
    const { userId, item } = req.body;
    console.log('Handle');
    await User.addToCart(userId, item);
    res.status(200).json({ message: "Item added to cart" });

    // Mettre à jour le stock
    await Stock.decreaseQuantity(item.id);
    
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

app.get("/api/stock",async(req,res) =>{
console.log(AHHHHHHHHHHH);
});

// Dans usersRoutes.js ou un fichier similaire
app.post('/api/users/:userId/addMoney', async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body; // Montant à ajouter

  try {
    // Assumer que vous avez une fonction pour mettre à jour le portefeuille de l'utilisateur
    const updatedUser = await User.updateUserWallet(userId, amount);
    res.json({ message: 'Solde mis à jour avec succès', wallet: updatedUser.wallet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du solde' });
  }
});


app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  console.error(error.message, error.stack);
  res.status(statusCode).json({ message: error.message });
  return;
});