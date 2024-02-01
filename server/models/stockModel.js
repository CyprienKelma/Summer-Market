const { ObjectId } = require('mongodb');
const { client } = require('./userModel'); // Assurez-vous que le chemin est correct  

async function createStockItem(productId, quantity) {
  const db = client.db();
  const productCollection = db.collection('products');
  const stockCollection = db.collection('stock');

  // Vérifiez si le produit existe
  const productExists = await productCollection.findOne({ _id: new ObjectId(productId) });
  if (!productExists) {
    throw new Error('Product does not exist');
  }

  // Si le produit existe, créez l'élément de stock
  const stockItem = {
    productId: new ObjectId(productId),
    quantity: quantity
  };

  try {
    const result = await stockCollection.insertOne(stockItem);
    return result.insertedId;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

// Cette fonction devrait être capable d'augmenter ou de diminuer la quantité de stock
async function adjustStockQuantity(productId, adjustBy) {
  const db = client.db();
  const result = await db.collection("stock").updateOne(
    { productId: new ObjectId(productId) },
    { $inc: { quantity: adjustBy } }
  );
  return result;
}

async function decreaseQuantity(productId) {
  try {
    const db = client.db();
    const result = await db.collection("stock").updateOne(
      { productId: new ObjectId(productId) },
      { $inc: { quantity: -1 } }
    );
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
async function getTheWholeStock() {
  try {
    const db = client.db();
    const stockItems = await db.collection("stock")
      .aggregate([
        {
          $lookup: {
            from: "products", // le nom de votre collection de produits
            localField: "productId", // la clé dans la collection de stock
            foreignField: "_id", // la clé dans la collection de produits
            as: "productInfo" // le nom du nouveau champ qui contiendra les informations de jointure
          }
        },
        {
          $unwind: "$productInfo" // décomposer le tableau de produits en objets
        },
        {
          $project: {
            quantity: 1,
            "productInfo.name": 1 // inclure le nom du produit dans les résultats
          }
        }
      ])
      .toArray();
    return stockItems;
  } catch (e) {
    console.error(e);
    throw e;
  }
}


module.exports = {
  createStockItem,
  decreaseQuantity,
  adjustStockQuantity,
  getTheWholeStock
};
