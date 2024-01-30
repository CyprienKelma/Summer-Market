const client = require('./server'); // Importer le client MongoDB
const bcrypt = require('bcrypt');

async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  
  try {
    const result = await client.db("yourDatabaseName").collection("users").insertOne(newUser);
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e; // Relayer l'erreur
  }
}

module.exports = {
  createUser
};
