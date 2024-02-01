// Admin.js
import React, { useState } from 'react';
import { generateProductDescription } from './API';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Admin = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const navigate = useNavigate();

  const handleCreateQRCode = () => {
    // Ici, vous pouvez ajouter la logique pour créer le QR code
    // Par exemple, utiliser une bibliothèque comme 'qrcode.react'
    
    // Rediriger vers la nouvelle page après la création du QR code
    navigate('/qrcode');
  };

  const handleDescriptionRequest = async () => {
    try {
      const description = await generateProductDescription(productName);
      setProductDescription(description);
    } catch (error) {
      // Gérer les erreurs ici
    }
  };

  return (
    <div>
      <h2>Page Admin</h2>
      <Button variant="contained" color="primary" onClick={handleCreateQRCode}>
        Créer un QR Code
      </Button>
      
    </div>
  );
};

export default Admin;