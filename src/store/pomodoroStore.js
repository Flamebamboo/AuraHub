import { create } from 'zustand';

const usePomodoroStore = create((set) => ({
  duration: 0,
  adjustDuration: (newDuration) => set({ duration: newDuration }),
  task: '',
  setTask: (newTask) => set({ task: newTask }),
  color: '',
  setColor: (newColor) => set({ color: newColor }),
}));

export default usePomodoroStore;
