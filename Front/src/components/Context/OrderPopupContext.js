import React, { createContext, useState, useCallback } from 'react';

export const OrderPopupContext = createContext();

export const OrderPopupProvider = ({ children }) => {
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  const openOrderPopup = useCallback(() => {
    setIsOrderPopupOpen(true);
  }, []);

  const closeOrderPopup = useCallback(() => {
    setIsOrderPopupOpen(false);
  }, []);

  return (
    <OrderPopupContext.Provider
      value={{ isOrderPopupOpen, openOrderPopup, closeOrderPopup }}
    >
      {children}
    </OrderPopupContext.Provider>
  );
};
