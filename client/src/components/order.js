import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Scanner from './scanner';
import { useCart } from './CartContext';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import config from '../ipconfig';

const buttonWidth = '250px';

const Order = () => {
  const { cartItems, addToCart } = useCart();
  const [showScanner, setShowScanner] = useState(false);

  const handleScannedData = async (data) => {
    setShowScanner(false);
    addToCart(data);
    try {
      const userId = localStorage.getItem('userId');
      
      await axios.post(`https://${config.ipServer}:${config.port}/api/cart/add`, {
        userId,
        item: data
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article au panier", error);
    }
  };

  const lastScannedItem = cartItems[cartItems.length - 1];

  const handleCloseScanner = () => {
    setShowScanner(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#EEE6D8', padding: '20px', minHeight: '100vh', position: 'relative' }}>
      {!showScanner && lastScannedItem && (
        <Card variant="outlined" sx={{ width: '100%', marginBottom: '20px', borderRadius: '10%',
         borderColor: '#DAAB3A', borderWidth: '5px', borderStyle: 'solid', 
         backgroundColor: '#eee6d8', maxWidth:'400px' }}>
          <CardContent>
            <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: 'Verdana'}} gutterBottom>
              Dernier article scanné :
            </Typography>
            <img
              src={lastScannedItem.image}
              alt={`Article`}
              style={{
                width: '100%',
                height: 'auto',
                // centre horizontalement et verticalement :
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '300px',
                maxHeight: '150px',
                objectFit: 'contain', // ou cover ?
                borderRadius: '10%'
              }}
            />
            <div>
              <Typography variant="subtitle1" sx={{ textAlign: 'center', fontFamily: 'Verdana'}}><strong>Nom:</strong> {lastScannedItem.nom}</Typography>
              <Typography variant="subtitle1" sx={{ textAlign: 'center', fontFamily: 'Verdana'}}><strong>Prix:</strong> {lastScannedItem.prix}</Typography>
            </div>
          </CardContent>
        </Card>
      )}

      {showScanner && <Scanner onScan={handleScannedData} onClose={handleCloseScanner} />}

      <Box sx={{ width: '100%', position: 'fixed', bottom: { xs: '90px', md: '100px' }, display: 'flex',
       flexDirection: 'column', alignItems: 'center', marginBottom: 0 }}>
        <Button variant="contained" color='success' size='large' sx={{ width: { xs: '250px', md: '300px' }, 
        height: { xs: '60px', md: '80px' }, marginBottom: '40px' }} onClick={() => setShowScanner(true)}>
          Scanner un article
        </Button>
        <Button variant="contained" size='large' sx={{ width: { xs: '250px', md: '300px' }, 
        height: { xs: '60px', md: '80px' }, backgroundColor: "#daab3a"}}>
          Valider le panier
        </Button>
      </Box>

    </Box>
  );
};

export default Order;
