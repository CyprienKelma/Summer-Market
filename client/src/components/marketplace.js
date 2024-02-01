// StockManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';


const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('https://localhost:5001/api/products');
            setProducts(response.data.products);
            setLoading(false);
          } catch (error) {
            console.error('Erreur lors de la récupération des produits', error);
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const closePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <h2 style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>Market-Place</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    products && products.length > 0 ? (
                    products.map(product => (
                        <div 
                            key={product._id} 
                            onClick={() => [handleProductClick(product), console.log(product.qrcode)]}
                            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}
                        >
                            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                            <p>Name: {product.name}</p>
                            <p>Price: {product.price}</p>
                            <p>Description: {product.description}</p>
                        </div>
                    ))
                    ) : (
                    <p>No products available</p>
                    )
                )}
            </div>
            {selectedProduct && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 999,
                    }}
                    onClick={closePopup}
                >
                    <div 
                        style={{ 
                            background: '#fff', 
                            padding: '20px', 
                            borderRadius: '5px',
                            textAlign: 'center'
                        }} 
                        onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedProduct.name} QR Code</h3>
                        {/* Utilisez le composant QRCode pour afficher le QR code */}
                        <QRCode value={JSON.stringify(selectedProduct.qrcode)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarketPlace;
