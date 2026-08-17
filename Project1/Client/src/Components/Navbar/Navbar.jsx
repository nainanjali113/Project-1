import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AllContext';
import { 
  FiSearch, 
  FiHeart, 
  FiShoppingCart, 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX,
  FiLogIn,
  FiUserPlus,
  FiUser,
  FiLogOut,
  FiChevronDown
} from 'react-icons/fi';

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  
  // ✅ Debug logging
  useEffect(() => {
    console.log('🔍🔍🔍 NAVBAR RENDERED - isLoggedIn:', isLoggedIn);
    console.log('🔍🔍🔍 NAVBAR RENDERED - user:', user);
  }, [isLoggedIn, user]); // This will log every time isLoggedIn changes
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showProfileMenu]);

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Women', path: '/women' },
    { name: 'Men', path: '/men' },
    { name: 'Kids', path: '/kids' },
    { name: 'Collection', path: '/collection' },
    { name: 'Sale', path: '/sale' }
  ];

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-2 shadow-2xl' : 'py-4'}`}>
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200">
        <nav className="container mx-auto py-5 px-4 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center gap-2 shrink-0 group cursor-pointer">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-teal-600 to-rose-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <h1 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-rose-600">
                  ELARA
                </h1>
              </div>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-700 hover:text-rose-600 transition font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-3 lg:gap-4">
              
              {/* Icons */}
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FiSearch size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiHeart size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full text-white text-xs flex items-center justify-center">0</span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {/* ✅ AUTH BUTTONS - WITH DEBUG VISUAL */}
              <div className="hidden md:flex items-center gap-2 ml-2">
                {!isLoggedIn ? (
                  // Show Login/Signup when NOT logged in
                  <>
                    <Link to="/signup">
                      <button className="px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-medium flex items-center gap-2 hover:bg-rose-600 transition">
                        <FiUserPlus size={16} />
                        SignUp
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="px-4 py-2 border-2 border-rose-500 text-rose-600 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-rose-50 transition">
                        <FiLogIn size={16} />
                        Login
                      </button>
                    </Link>
                  </>
                ) : (
                  // ✅ Show Profile button when logged in
                  <div className="relative profile-menu">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center gap-2 px-3 py-2 bg-rose-100 border border-rose-300 rounded-full hover:bg-rose-200 transition"
                    >
                      <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center">
                        <FiUser size={12} className="text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {user?.name?.split(' ')[0] || 'Profile'}
                      </span>
                      <FiChevronDown size={14} className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl z-50">
                        <div className="py-2">
                          <div className="px-4 py-3 border-b">
                            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                          </div>
                          <Link to="/profile">
                            <button 
                              onClick={() => setShowProfileMenu(false)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <FiUser size={14} /> My Profile
                            </button>
                          </Link>
                          <Link to="/orders">
                            <button 
                              onClick={() => setShowProfileMenu(false)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <FiShoppingCart size={14} /> My Orders
                            </button>
                          </Link>
                          <div className="border-t my-1"></div>
                          <button 
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <FiLogOut size={14} /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t p-4">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="block py-2 text-gray-700 hover:text-rose-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <div className="border-t pt-3 mt-2">
                {!isLoggedIn ? (
                  <>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full py-2 bg-rose-500 text-white rounded-lg mb-2">SignUp</button>
                    </Link>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full py-2 border border-rose-500 text-rose-600 rounded-lg">Login</button>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="py-2 px-3 bg-rose-50 rounded-lg mb-2">
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full py-2 text-left text-gray-700">My Profile</button>
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-2 text-left text-red-600"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </ul>
          </div>
        )}
      </header>
      
      {/* ✅ DEBUG INDICATOR - Shows current login state visually */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`px-3 py-1 rounded-full text-xs font-mono shadow-lg ${isLoggedIn ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {isLoggedIn ? `✅ Logged in as: ${user?.name || 'User'}` : '❌ Not logged in'}
        </div>
      </div>
    </div>
  );
}