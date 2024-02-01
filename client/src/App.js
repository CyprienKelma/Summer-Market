import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'; 
import Footer from './components/footer';
import Header from './components/header';
import Order from './components/order';
import Items from './components/items';
import Register from './components/register';
import { CartProvider } from './components/CartContext';
import Admin from './components/admin';
import Qrcode from './components/qrcode';
function App() {
  const [scannedItems, setScannedItems] = useState([]);

  return (
    <Router>
      <Header />
      <CartProvider>
      <Routes>
        <Route path="/order" element={<Order scannedItems={scannedItems} setScannedItems={setScannedItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/qrcode" element={<Qrcode />} />
        <Route path="/items" element={<Items scannedItems={scannedItems} />} />
      </Routes>
      </CartProvider>
      <Footer />
    </Router>
  );
}

export default App;
