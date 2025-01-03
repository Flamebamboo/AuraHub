import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

const useTimerStore = create(
  persist(
    (set) => ({
      task: 'Select Task',
      color: '#ffffff',
      duration: 1800,
      setTask: (task) => set({ task }),
      setColor: (color) => set({ color }),
      setDuration: (duration) => set({ duration }),
    }),
    {
      name: 'timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTimerStore;
