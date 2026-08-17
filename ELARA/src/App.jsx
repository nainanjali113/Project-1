import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkLightProvider } from './context/DarkLightContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import Women from './Components/Pages/Women';
import Men from './Components/Pages/Men';
import Kids from './Components/Pages/Kids';
import Collection from './Components/Pages/Collection';
import Sale from './Components/Pages/Sale';

function App() {
  return (
    <DarkLightProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/sale" element={<Sale />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DarkLightProvider>
  );
}

export default App;