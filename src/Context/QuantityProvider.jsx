import React, { createContext, useContext, useState } from 'react';

const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(() => {
    const storedQuantity = localStorage.getItem('quantity');
    return storedQuantity ? parseInt(storedQuantity, 10) : 1;
  });

  const [address, setAddress] = useState(() => {
    const storedAddress = localStorage.getItem('address');
    return storedAddress || '';
  });

  const [arrIdBook, setArrIdBook] = useState(() => {
    const storedArrIdBook = localStorage.getItem('arrIdBook');
    try {
      return storedArrIdBook ? JSON.parse(storedArrIdBook) : [];
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return [];
    }
  });
  
  const [arrQuantity, setArrQuantity] = useState(() => {
    const storedArrIdBook = localStorage.getItem('arrQuantity');
    try {
      return storedArrIdBook ? JSON.parse(storedArrIdBook) : [];
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return [];
    }
  });
  const [priceTotal, setPriceTotal] = useState(() => {
    const storedArrIdBook = localStorage.getItem('priceTotal');
    try {
      return storedArrIdBook ? JSON.parse(storedArrIdBook) : 0;
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return [];
    }
  });

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    localStorage.setItem('quantity', newQuantity);
  };

  const updateArrQuantity = (newQuantity) => {
    setArrQuantity(newQuantity);
    localStorage.setItem('arrQuantity', newQuantity);
  };
  const updatePriceTotal = (newQuantity) => {
    setPriceTotal(newQuantity);
    localStorage.setItem('priceTotal', newQuantity);
  };
  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem('address', newAddress);
  };

  const updateArrIdBook = (newArrIdBook) => {
    setArrIdBook(newArrIdBook);
    localStorage.setItem('arrIdBook', JSON.stringify(newArrIdBook));
  };

  return (
    <QuantityContext.Provider value={{ quantity, updateQuantity, address, updateAddress, arrIdBook, updateArrIdBook, arrQuantity, updateArrQuantity, priceTotal, updatePriceTotal }}>
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantity = () => {
  const context = useContext(QuantityContext);
  if (!context) {
    throw new Error('useQuantity must be used within a QuantityProvider');
  }
  return context;
};