import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useCart } from './CartContext';

const Items = () => {
  const { cartItems } = useCart();

  // Fonction pour calculer la somme des prix des articles
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.prix); // Utilise parseFloat pour convertir en nombre
    });
    return total.toFixed(2); // Formatage du total avec 2 décimales
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 250px)', alignItems: 'center', marginTop: '3px', background: '#f5f5f5'}}>
      {/* Section pour afficher les articles scannés avec un scroll */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
      {cartItems.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px', border: '2px solid #e0e0e0', paddingLeft: '10px', paddingRight: '10px'}}>
          <img src={item.image} alt={`Article ${index}`} style={{ maxWidth: '100px', marginRight: '10px' }} />
          <div>
            <p>Nom: {item.nom}</p>
            <p>Prix: {item.prix}</p>
          </div>
        </div>
      ))}
      </Box>
      <Box
      sx={{
        position: 'absolute',
        bottom: '70px',
        left: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
      >
        {/* Affichage du total */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <p>Total: {calculateTotal()} €</p>
        </div>
        <Button variant="outlined" sx={{ width: '200px' }}>
        Valider panier 
        </Button>
      </Box>
    </Box>
  );
};

export default Items;
