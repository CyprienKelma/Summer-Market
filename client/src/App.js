import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'; 
import Footer from './components/footer';
import Header from './components/header';
import Order from './components/order';
import Items from './components/items';
import Register from './components/register';
import Account from './components/account';
import { CartProvider } from './components/CartContext';
import Admin from './components/admin';
import Qrcode from './components/qrcode';
import StockManagement from './components/StockManagement';
import MarketPlace from './components/marketplace';
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
        <Route path="/account" element={<Account />} />
        <Route path="/qrcode" element={<Qrcode />} />
        <Route path="/items" element={<Items scannedItems={scannedItems} />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/stock-management" element={<StockManagement />} />
      </Routes>
      </CartProvider>
      <Footer />
    </Router>
  );
}

export default App;