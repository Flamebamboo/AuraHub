import React, { createContext, useState } from 'react';

export const PomodoroContext = createContext();

const DEFAULT_FOCUS_DATA = {
  duration: 1800, // 30 minutes in seconds (30 * 60)
  mode: 'focus',
  selectedTask: '',
  taskColor: '#FF0000',
};

const PomodoroContextProvider = ({ children }) => {
  const [pomodoroData, setPomodoroData] = useState(DEFAULT_FOCUS_DATA);

  // Helper to update focus data while preserving defaults
  const updateFocusData = (newData) => {
    setPomodoroData((prev) => ({
      ...DEFAULT_FOCUS_DATA, // Always include defaults
      ...prev, // Keep existing data
      ...newData, // Add new data
    }));
  };

  return (
    <PomodoroContext.Provider
      value={{
        pomodoroData,
        setPomodoro: updateFocusData,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroContextProvider;
