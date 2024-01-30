import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const Scanner = ({ onScan, onClose }) => {
    const videoRef = useRef();
    const [scanned, setScanned] = useState(false);
    
    useEffect(() => {
        const scanner = new QrScanner(videoRef.current, (result) => {
          try {
            const data = JSON.parse(result);
            onScan(data); // Utilisez le callback pour transmettre les données
            setScanned(true);
            scanner.stop();
          } catch (error) {
            console.error("Erreur lors du traitement du QR Code:", error);
          }
        });
        scanner.start();
        
        return () => scanner.stop();
      }, [onScan]); // Ajoutez onScan dans le tableau de dépendances
    
      return (
        <div className="qr-code-scanner-container">
            <video ref={videoRef} className="qr-code-video" />
            <button onClick={onClose} className="close-scanner-button">X</button>
        </div>
    );
  };
  
  export default Scanner;