// StockManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get('https://10.224.1.139:5001/api/stock'); // Utilisez https si c'est requis
        setStockItems(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du stock', error);
      }
    };
  
    fetchStock();
  }, []);

  return (
    <div>
      <h2>Gestion du Stock</h2>
      <ul>
        {stockItems.map(stockItem => (
          <li key={stockItem._id}>Nom: {stockItem.productInfo.name} - Quantité: {stockItem.quantity}</li>
          ))}
      </ul>
    </div>
  );
};

export default StockManagement;
