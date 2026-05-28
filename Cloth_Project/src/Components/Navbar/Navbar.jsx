// Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MENUDATA } from './Data';

// Base color configuration for future use
// You can easily change these colors globally from here
const COLORS = {
  primary: '#10b981',     // green-500
  primaryDark: '#059669', // green-600
  primaryLight: '#34d399', // green-400
  black: '#000000',
  white: '#ffffff',
  gray: '#6b7280',
  grayDark: '#374151',
  grayLight: '#f3f4f6',
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const dropdownRefs = useRef([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown !== null) {
        const ref = dropdownRefs.current[openDropdown];
        if (ref && !ref.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDesktopDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleMobileDropdown = (index) => {
    setMobileDropdownOpen(mobileDropdownOpen === index ? null : index);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };

  const mobileSubmenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-white dark:bg-black shadow-md sticky top-0 z-50 select-none">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-2xl font-bold"
              style={{ color: COLORS.primary }}
            >
              Logo
            </a>
          </div>

          {/* Desktop Menu - hidden on mobile, visible on lg and above */}
          <ul className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {MENUDATA.map((item, idx) => (
              <li 
                key={idx} 
                className="relative" 
                ref={(el) => (dropdownRefs.current[idx] = el)}
              >
                <button
                  onClick={() => handleDesktopDropdown(idx)}
                  className="flex items-center gap-2 px-3 py-2 text-black dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 rounded-lg font-medium"
                >
                  <span className="text-lg">{item.icons}</span>
                  <span>{item.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdown === idx ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {openDropdown === idx && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      {item.dropdownMenu.map((category, catIdx) => (
                        <div key={catIdx} className="p-2">
                          <div 
                            className="flex items-center gap-2 px-3 py-2 font-semibold border-b border-gray-200 dark:border-gray-700"
                            style={{ color: COLORS.primary }}
                          >
                            <span className="text-lg">{category.icons}</span>
                            <span>{category.name}</span>
                          </div>
                          <div className="py-1">
                            {category.list.map((subItem, subIdx) => (
                              <a
                                key={subIdx}
                                href={subItem.slug}
                                className="flex items-center gap-3 px-3 py-2 text-black dark:text-white hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-colors duration-200"
                              >
                                <span className="text-base">{subItem.icons}</span>
                                <span>{subItem.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="/log-in">
              <button 
                className="px-5 select-none py-2 border rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 font-medium"
                style={{ 
                  borderColor: COLORS.primary,
                  color: COLORS.primary
                }}
              >
                Log-in
              </button>
            </a>
            <a href="/create">
              <button 
                className="px-5 select-none py-2 text-white rounded-lg transition-all duration-200 font-medium"
                style={{ 
                  backgroundColor: COLORS.primary,
                }}
              >
                Sign-up
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-3 space-y-1">
                {MENUDATA.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <button
                      onClick={() => handleMobileDropdown(idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-black dark:text-white hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl" style={{ color: COLORS.primary }}>{item.icons}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileDropdownOpen === idx ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {mobileDropdownOpen === idx && (
                        <motion.div
                          variants={mobileSubmenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="pl-8 pr-4 pb-3 space-y-2"
                        >
                          {item.dropdownMenu.map((category, catIdx) => (
                            <div key={catIdx} className="mt-2">
                              <div 
                                className="flex items-center gap-2 px-3 py-2 font-semibold"
                                style={{ color: COLORS.primary }}
                              >
                                <span className="text-base">{category.icons}</span>
                                <span>{category.name}</span>
                              </div>
                              <div className="pl-6 space-y-1">
                                {category.list.map((subItem, subIdx) => (
                                  <a
                                    key={subIdx}
                                    href={subItem.slug}
                                    className="flex items-center gap-3 px-3 py-2 text-black dark:text-white hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <span className="text-sm">{subItem.icons}</span>
                                    <span>{subItem.name}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3 pt-4 px-4 pb-3">
                  <a href="/log-in" onClick={() => setMobileMenuOpen(false)}>
                    <button 
                      className="w-full px-5 py-2.5 border rounded-lg transition-all duration-200 font-medium"
                      style={{ 
                        borderColor: COLORS.primary,
                        color: COLORS.primary
                      }}
                    >
                      Log-in
                    </button>
                  </a>
                  <a href="/create" onClick={() => setMobileMenuOpen(false)}>
                    <button 
                      className="w-full select-none px-5 py-2.5 text-white rounded-lg transition-all duration-200 font-medium"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      Sign-up
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}