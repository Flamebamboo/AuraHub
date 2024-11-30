import React, { createContext, useState } from 'react';

export const FocusContext = createContext();

const FocusContextProvider = ({ children }) => {
  const [focusData, setFocusData] = useState({
    duration: null,
    mode: null,
  });

  return <FocusContext.Provider value={{ focusData, setFocusData }}>{children}</FocusContext.Provider>;
};

export default FocusContextProvider;
