// StockManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantityToAdd, setQuantityToAdd] = useState('');
  
    useEffect(() => {
        const fetchStock = async () => {
          try {
            const response = await axios.get('https://10.224.1.68:5001/api/stock');
            setStockItems(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération du stock', error);
          }
        };
    
        const fetchProducts = async () => {
          try {
            const response = await axios.get('https://10.224.1.68:5001/api/products');
            setProducts(response.data.products); // Assurez-vous que la réponse contient un tableau de produits
          } catch (error) {
            console.error('Erreur lors de la récupération des produits', error);
          }
        };
    
        fetchStock();
        fetchProducts();
      }, []);

      const handleAddStock = async (e) => {
        e.preventDefault();
        try {
          await axios.post('https://10.224.1.68:5001/api/stock/add', {
            productId: selectedProduct,
            quantity: Number(quantityToAdd)
          });
          // Rafraîchir la liste du stock ou afficher un message de succès
          // ...
        } catch (error) {
          console.error('Erreur lors de l ajout de stock', error);
        }
      };
  return (
    <div>
      <h2>Gestion du Stock</h2>
      <ul>
        {stockItems.map(stockItem => (
          <li key={stockItem._id}>Nom: {stockItem.productInfo.name} - Quantité: {stockItem.quantity}</li>
        ))}
      </ul>

      {/* Formulaire pour ajouter du stock */}
      <form onSubmit={handleAddStock}>
        <label>
          Produit:
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Sélectionnez un produit</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantité à ajouter:
          <input
            type="number"
            value={quantityToAdd}
            onChange={(e) => setQuantityToAdd(e.target.value)}
          />
        </label>
        <button type="submit">Ajouter au stock</button>
      </form>
    </div>
  );
};

export default StockManagement;
