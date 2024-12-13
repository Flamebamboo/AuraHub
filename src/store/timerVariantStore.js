import { create } from 'zustand';

const useTimerVariant = create((set) => ({
  variant: 'COFFEE_CUP',
  setVariant: (newVariant) => set({ variant: newVariant }), // changable from (shop) focus design
}));

export default useTimerVariant;
