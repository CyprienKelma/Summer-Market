// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'; 
import Footer from './components/footer';
import Header from './components/header';
import Order from './components/order';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/order" element={<Order />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/items" element={<Items />} /> */}
        {/* <Route path="/account" element={<Account />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
