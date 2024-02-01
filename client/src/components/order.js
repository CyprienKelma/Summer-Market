import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Scanner from './scanner'; 
import Items from './items'; 
import { useCart } from './CartContext';

const buttonWidth = '200px'; // Vous pouvez ajuster cette valeur selon vos besoins

const Order = () => {
  const { cartItems, addToCart } = useCart();
  const [showScanner, setShowScanner] = useState(false);

  const handleScannedData = (data) => {
    setShowScanner(false); // Cache le scanner après le scan
    console.log(data);
    addToCart(data);

  };


  // Accéder au dernier élément scanné
  const lastScannedItem = cartItems[cartItems.length - 1];

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 250px)', alignItems: 'center', marginTop: '3px', background: '#f5f5f5'}}>
      {/* Affichage du dernier article scanné */}
      {lastScannedItem && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Dernier article scanné :</h2>
          <img src={lastScannedItem.image} alt={`Article`} style={{ maxWidth: '300px', maxHeight: '300px' }} />
          <div>
            <p><strong>Nom:</strong> {lastScannedItem.nom}</p>
            <p><strong>Prix:</strong> {lastScannedItem.prix}</p>
          </div>
        </div>
      )}

      {/* Boutons et scanner */}
      <Box sx={{ position: 'absolute', bottom: '60px', left: 0, right: 0, width: '100%', display: 'flex', background: '#f5f5f5', flexDirection: 'column', alignItems: 'center', '& > *': { m: 1 }}}>
        {showScanner && <Scanner onScan={handleScannedData} onClose={handleCloseScanner} />}
        <Button variant="outlined" sx={{ width: buttonWidth, mb: 2 }} onClick={() => setShowScanner(true)}>
          Scan article
        </Button>
        <Button variant="outlined" sx={{ width: buttonWidth }}>
          Payer panier
        </Button>
      </Box>
    </Box>
  );
};


export default Order;