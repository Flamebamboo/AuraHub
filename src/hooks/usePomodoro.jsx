{
  /*
  
Pomodoro Timer:

How Traditional Pomodoro Techniques Works:
    - User can start a 25 minute timer 
    - User cannot pause the timer
    - goes through 4 cycles of 25 minutes with a 5 minute rest in between
    - After 4 cycles, user gets a 15 minute rest
   


In App Pomodoro Timer Features:
    - Total Session Duration
    - Customizable number of cycles,
    - Customizable short rest time,
    - Customizable long rest time,
    - User can end the timer at any time
    

    TO DO:
    get current cycle with switch statement

    handle phase completion

    initiate timer 

    get progress
    */
}

import { useState, useEffect, useCallback } from 'react';
import { TimerService } from '@/services/timerService';

export const usePomodoro = (initialDuration, cycles, shortRest, longRest) => {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phase, setPhase] = useState('work');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(null);

  const getCurrentDuration = useCallback(() => {
    switch (phase) {
      case 'work':
        return initialDuration;
      case 'shortRest':
        return shortRest;
      case 'longRest':
        return shortRest;
      default:
        return initialDuration;
    }
  }, [phase, initialDuration, shortRest, longRest]);

  const handlePhaseCompletion = useCallback(() => {});
};
