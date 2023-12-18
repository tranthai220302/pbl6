import React, { createContext, useContext, useEffect, useState } from 'react';

const QuantityContext = createContext();

export const QuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(() => {
    // Khôi phục giá trị từ localStorage, nếu không có thì mặc định là 1
    const storedQuantity = localStorage.getItem('quantity');
    return storedQuantity ? parseInt(storedQuantity, 10) : 1;
  });

  const [address, setAddress] = useState(() => {
    // Khôi phục giá trị từ localStorage, nếu không có thì mặc định là ''
    const storedAddress = localStorage.getItem('address');
    return storedAddress || '';
  });

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    localStorage.setItem('quantity', newQuantity);
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem('address', newAddress);
  };


  return (
    <QuantityContext.Provider value={{ quantity, updateQuantity, address, updateAddress }}>
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
