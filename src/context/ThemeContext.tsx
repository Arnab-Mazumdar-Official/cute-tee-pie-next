"use client"

import React, { createContext, useState, useEffect, useContext } from 'react';

interface ThemeContextProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // On mount, check local storage for preferred theme
    const storedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever mode changes
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


export { ThemeContext, ThemeProvider,useTheme};