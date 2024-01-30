const express = require("express");
const dotenv = require("dotenv").config();
const { connectDB } = require("./config/db"); // Importer la fonction de connexion

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/users", require("./routes/usersRoutes"));

// Établir la connexion à la base de données au démarrage du serveur
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => {
  console.error('Database connection failed', err);
  process.exit();
});
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  console.error(error.message, error.stack);
  res.status(statusCode).json({ message: error.message });
  return;
});