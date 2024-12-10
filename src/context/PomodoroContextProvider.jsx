import React, { createContext, useState } from 'react';

export const PomodoroContext = createContext();

const DEFAULT_POMODORO_DATA = {
  pomodoroDuration: 25,
};
const PomodoroContextProvider = ({ children }) => {
  const [pomodoroData, setPomodoroData] = useState(DEFAULT_POMODORO_DATA);

  const updatePomodoroData = (newData) => {
    setPomodoroData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <PomodoroContext.Provider value={{ pomodoroData, setPomodoroData: updatePomodoroData }}>
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroContextProvider;
