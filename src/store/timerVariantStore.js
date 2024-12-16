import { create } from 'zustand';

const useTimerVariant = create((set) => ({
  variant: 'COFFEE_CUP',
  setVariant: (newVariant) => set({ variant: newVariant }), // changeable from (shop) focus design
}));


// export const designItems = [
//   {
//     id: 1,
//     name: 'Coffee Cup',
//     image: '',
//     price: 10,
//
//   },
//   {
//     id: 2,
//     name: 'Square',
//     image: '',
//     price: 10,
//
//   },
//
//
//
// ]

export default useTimerVariant;
