// context/FocusContextProvider.jsx
import React, { createContext, useState } from 'react';

export const FocusContext = createContext();

const DEFAULT_FOCUS_DATA = {
  duration: 1800, // 30 minutes in seconds (30 * 60)
  mode: 'focus',
  selectedTask: '',
  taskColor: '#FF0000',
};

const FocusContextProvider = ({ children }) => {
  const [focusData, setFocusData] = useState(DEFAULT_FOCUS_DATA);

  // Helper to update focus data while preserving defaults
  const updateFocusData = (newData) => {
    setFocusData((prev) => ({
      ...DEFAULT_FOCUS_DATA, // Always include defaults
      ...prev, // Keep existing data
      ...newData, // Add new data
    }));
  };

  return (
    <FocusContext.Provider
      value={{
        focusData,
        setFocusData: updateFocusData,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};

export default FocusContextProvider;
