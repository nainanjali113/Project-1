import React, { createContext, useState, useContext, useEffect } from 'react';

const DarkLightContext = createContext();

export const useDarkLight = () => {
  const context = useContext(DarkLightContext);
  if (!context) {
    throw new Error('useDarkLight must be used within DarkLightProvider');
  }
  return context;
};

export const DarkLightProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkLightContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkLightContext.Provider>
  );
};