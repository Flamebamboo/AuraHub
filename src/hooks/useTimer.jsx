// hooks/useTimer.js
import { useState, useEffect, useCallback } from 'react';
import { TimerService } from '@/services/timerService';

export const useTimer = (initialDuration) => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const newTimer = new TimerService(
      initialDuration,
      (time) => setTimeRemaining(time),
      () => setIsActive(false)
    );
    setTimer(newTimer);

    return () => newTimer.cleanup();
  }, [initialDuration]);

  const start = useCallback(() => {
    if (timer) {
      timer.start();
      setIsActive(true);
    }
  }, [timer]);

  const pause = useCallback(() => {
    if (timer) {
      timer.pause();
      setIsActive(false);
    }
  }, [timer]);

  const stop = useCallback(() => {
    if (timer) {
      timer.stop();
      setIsActive(false);
    }
  }, [timer]);

  const getProgress = useCallback(() => {
    return timer ? timer.getProgress() : 0;
  }, [timer]);

  return {
    timeRemaining,
    isActive,
    start,
    pause,
    stop,
    getProgress,
  };
};
