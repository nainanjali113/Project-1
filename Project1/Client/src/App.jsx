import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import SignUp from './Components/Auth/SignUp.jsx';
import Login from './Components/Auth/Login.jsx';
import Profile from './Components/Navbar/Profile.jsx';
import Home from './Components/Pages/Home.jsx';
import Women from './Components/Pages/Women.jsx';
import Men from './Components/Pages/Men.jsx';
import Kids from './Components/Pages/Kids.jsx';
import Collection from './Components/Pages/Collection.jsx'
import Sale from './Components/Pages/Sale.jsx';
import {AuthProvider} from './Components/Context/AllContext.jsx' 
import Dashboard from './Components/Dashboard/Home_Dashboard.jsx'


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard/" element={<Dashboard/>} />
 
          <Route path="/home" element={<Home />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/sale" element={<Sale />} />
          
          {/* Auth Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Fallback Route - 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </AuthProvider>

    </Router>
  );
}

// Simple 404 Component
function NotFound() {    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-rose-300 to-amber-300 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900 pt-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white text-xl mb-6">Page Not Found</p>
        <a href="/" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all">
          Go Back Home
        </a>
      </div>
    </div>
  );
}