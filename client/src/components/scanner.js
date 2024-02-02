import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import '../css/scanner.css';

const Scanner = ({ onScan, onClose }) => {
  const videoRef = useRef();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const scanner = new QrScanner(videoRef.current, (result) => {
      try {
        const data = JSON.parse(result);
        onScan(data);
        setScanned(true);
        scanner.stop();
      } catch (error) {
        console.error("Erreur lors du traitement du QR Code:", error);
      }
    });
    scanner.start();

    return () => scanner.stop();
  }, [onScan]);

  return (
    <div className="scanner-container">
      <div className="camera-container">
        <video ref={videoRef} className="qr-code-video" />
      </div>
      <button onClick={onClose} className="close-scanner-button">X</button>
    </div>
  );
};

export default Scanner;
