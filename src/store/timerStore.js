import { create } from 'zustand';

const useTimerStore = create((set) => ({
  duration: 0,
  adjustDuration: (newDuration) => set({ duration: newDuration }),
  mode: 'focus',
  setMode: (newMode) => set({ mode: newMode }),
  task: 'Select Task',
  setTask: (newTask) => set({ task: newTask }),
  color: 'red',
  setColor: (newColor) => set({ color: newColor }),
}));

export default useTimerStore;
