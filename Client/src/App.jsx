import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Pages/Home'
import Women from './Components/Pages/Women'
import Men from './Components/Pages/Men'
import Kids from './Components/Pages/Kids'
import Collection from './Components/Pages/Collection'
import Sale from './Components/Pages/Sale'
import SignUp from './Components/Auth/SignUp'
import Login from './Components/Auth/Login'

function App() {
  return (
    
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    
  )
}

export default App