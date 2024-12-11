import { create } from 'zustand';

const usePomodoroStore = create((set) => ({
  duration: 0,
  adjustDuration: (newDuration) => set({ duration: newDuration }),
  shortRest: 0,
  adjustShortRest: (newShortRest) => set({ shortRest: newShortRest }),
  longRest: 0,
  adjustLongRest: (newLongRest) => set({ longRest: newLongRest }),
  cycles: 0,
  adjustCycles: (newCycles) => set({ cycles: newCycles }),
  task: '',
  setTask: (newTask) => set({ task: newTask }),
  color: '',
  setColor: (newColor) => set({ color: newColor }),
}));

export default usePomodoroStore;
