import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // N'oubliez pas d'importer axios
import { generateProductDescription } from './API';
import { FadeLoader } from 'react-spinners';

const Qrcode = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [_id, set_id] = useState(null);
  const [itemName, setItemName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [qrCodeData, setQrCodeData] = useState(null);
  const [appuye, setAppuye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleDescriptionRequest = async () => {
    try {
      // Utiliser setItemName pour mettre à jour l'état itemName
      setItemName(itemName);

      setLoading(true); // Activer le chargement pendant la requête
  
      const description = await generateProductDescription(itemName);
      setProductDescription(description);

      setLoading(false); // Désactiver le chargement après la requête
    } catch (error) {
      // Gérer les erreurs ici
      console.error("Erreur lors de la demande de description :", error);
      setLoading(false); // Assurez-vous de désactiver le chargement en cas d'erreur
    }
  };

  useEffect(() => {
    const sendToDatabase = async () => {
        try {
            console.log("nom : " + itemName + " prix : " + price + " url : " + imageUrl + " desc : " + productDescription + " qr : " + qrCodeData);
            // let qr =  {

            // }
            const response = await axios.post('https://localhost:5001/api/products', {
                image: imageUrl,
                price: price,
                name: itemName,
                description: productDescription,
                qrcode: JSON.stringify(qrCodeData)
            })
            
            setAppuye(false);

            if (response.data.message === 'Product created') {
                console.log('Produit enregistré avec succès');
                setMessage('Produit enregistré avec succès');

                // Masquer les éléments du formulaire
                setIsVisible(false);

                // Rediriger après 3 secondes
                setTimeout(() => {
                    navigate('/admin');
                }, 3000);

                fetchID();

            } else {
                console.error('Échec de lenregistrement du produit');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à la base de données :', error);
        }
    };
    
    if(itemName != "" && price != "" && imageUrl != "" && productDescription != "" && qrCodeData != null && appuye) {
        sendToDatabase();
    }
  }, [qrCodeData, itemName, price, imageUrl, productDescription])


  useEffect(() => {

    const updateAllQrCodeIds = async () => {
      try {
        const updatedProducts = products.map(async (product) => {
          // Utiliser l'_id du produit comme nouvelle valeur pour qrcode.id
          const newQrCodeId = product._id.toString();
    
          // Convertir la propriété 'qrcode' en objet JavaScript
          product.qrcode = JSON.parse(product.qrcode);

          // Mettre à jour la propriété qrcode.id du produit
          product.qrcode.id = newQrCodeId;
          
          console.log('jsuis la')
    
          // Mettre à jour le produit dans la base de données
          const response = await axios.put(`https://localhost:5001/api/products/:${product._id}`, {
            qrcode: JSON.stringify(product.qrcode),
          });

    
          if (response.data.message === 'Product updated') {
            console.log(`Produit avec l'id ${product._id} mis à jour avec succès`);
          } else {
            console.error(`Échec de la mise à jour du produit avec l'id ${product._id}`);
          }
        });
    
        console.log(products)
        // Attendre que toutes les mises à jour soient terminées
        await Promise.all(updatedProducts);
    
        console.log('Tous les produits ont été mis à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour des produits:', error);
      }
    };
    if (products.length > 0) {
      console.log("?")
      updateAllQrCodeIds();
    }
  }, [products])
  
  const fetchID = async () => {
    try {
      const response = await axios.get('https://localhost:5001/api/products');
      setProducts(response.data.products); // Assurez-vous que la réponse contient un tableau de produits
      console.log(response.data.products)
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  const handleSetPrice = (event) => {
    const regex = /^[0-9]*$/;
    if (regex.test(event.target.value) || event.target.value === '') {
      setPrice(event.target.value);
    }
  };

  useEffect(() => {
    const handleGenerateQRCode = () => {
        const data = {
            nom: itemName,
            prix: price,
            image: imageUrl,
            id: _id,
        };
        setQrCodeData(data);
    };
    if(itemName != "" && price != "" && imageUrl != "" && productDescription != "" && appuye) {
        handleGenerateQRCode();
    }
  }, [itemName, price, imageUrl, productDescription])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="73vh"
    >
    {/* Ajouter une condition pour afficher ou masquer le contenu */}
      {isVisible ? (
        <>
      <h2 style={{ fontFamily: 'Arial', fontSize: '2em', textAlign: 'center', margin: 0, marginBottom: '20px' }}>
        Formulaire de génération du QR-code
      </h2>

      <TextField
        label="Nom de l'article"
        variant="outlined"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        margin="normal"
        style={{ marginTop: '12px' }}
      />

      <TextField
        label="Prix"
        variant="outlined"
        value={price}
        onChange={handleSetPrice}
        margin="normal"
        type="tel"
        style={{ marginTop: '12px' }}
      />

      <TextField
        label="URL de l'image"
        variant="outlined"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        margin="normal"
        style={{ marginTop: '12px' }}
      />

      {/* <button onClick={handleDescriptionRequest}>Demander Description</button> */}

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
            setAppuye(true);
            handleDescriptionRequest();
        }}
        style={{ marginTop: '23px' }}
      >
        Générer un QR code et Ajouter à la base de données
      </Button>
      {loading && <FadeLoader color="#36D7B7" size={15} />} {/* Ajout du spinner de chargement */}
      </>
      ) : (
        <p>{message}</p>
      )}
      {/* 
      {qrCodeData && (
        <Box style={{ marginTop: '30px' }}>
          <QRCode value={JSON.stringify(qrCodeData)} />
        </Box>
      )}

      <div>
        <h3>Description de l'article générée:</h3>
        <p>{productDescription}</p>
      </div> */}
    </Box>
  );
};

export default Qrcode;