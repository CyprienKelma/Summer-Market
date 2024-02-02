const { MongoClient } = require('mongodb');

let db;

async function connectDB(uri) {
  console.log("value : " + uri);
  if (db) return db;

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db("Cluster0");
  return db;
}

module.exports = { connectDB };