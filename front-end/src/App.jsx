import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Landing from './Components/Landing';
import Signaut from './Components/Signaut'; // ✅ Fixed typo from Signaut to Signout
import HomeSeller from './Components/HomeSeller';
import HomeUser from './Components/HomeUser'; // ✅ Added HomeUser component
import AuctionForm from './Components/AuctionForm';
import LoginSeller from './Components/LoginSeller';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signaut" element={<Signaut />} /> {/* ✅ Fixed route name */}
        <Route path="/homeseller" element={<HomeSeller />} />
        <Route path="/homeuser" element={<HomeUser />} /> {/* ✅ Added HomeUser route */}
        <Route path="/auctionform" element={<AuctionForm />} />
        <Route path="/LoginSeller" element={<LoginSeller />} />
      </Routes>
    </Router>
  );
}

export default App;
