import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  

  const addToCart = async (item) => {
    try {
      // Vous devrez avoir l'ID de l'utilisateur connecté disponible, par exemple dans le localStorage
      const userId = localStorage.getItem('userId');
      await axios.post(`/api/users/${userId}/cart`, { productId: item.id });
      setCartItems(currentItems => [...currentItems, item]);
    } catch (error) {
      console.error('Erreur lors de l ajout au panier', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
