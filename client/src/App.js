// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; 
import Register from './components/Register';
import Footer from './components/Footer';
import Header from './components/Header';
import Order from './components/Order';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Order" element={<Order />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        {/* <Route path="/items" element={<Items />} /> */}
        {/* <Route path="/account" element={<Account />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;