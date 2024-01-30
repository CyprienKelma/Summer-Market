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
  const [scannedItems, setScannedItems] = useState([]);

  const handleScannedData = (data) => {
    setScannedItems(prevItems => [...prevItems, data]);
    setShowScanner(false); // Cache le scanner après le scan
    addToCart(data);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 250px)', alignItems: 'center', marginTop: '3px', background: '#f5f5f5'}}>
      {/* Section pour afficher les articles scannés avec un scroll */}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
      {scannedItems.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '10px', border: '2px solid #e0e0e0'}}>
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
      {showScanner && <Scanner onScan={handleScannedData} />}
      <Button
        variant="outlined"
        sx={{ width: buttonWidth, mb: 2 }}
        onClick={() => setShowScanner(true)}
      >
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