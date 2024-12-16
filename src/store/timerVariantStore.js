import { create } from 'zustand';

const useTimerVariant = create((set) => ({
  items: designItems,
  ownedItems: [1],
  equipedItem: '1',
  purchaseItem: (id) => set((state) => ({ ownedItems: [...state.ownedItems, id] })),
  setVariant: (id) => set({ variant: id }), // changeable from (shop) focus design
}));

export const designItems = [
  {
    id: 1,
    variant: 'COFFEE_CUP',
    name: 'Coffee Cup',
    description: 'A cup of coffee',
    image: require('../../assets/images/square1.png'),
    price: 10,
  },
  {
    id: 2,
    variant: 'SQUARE',
    name: 'Square',
    description: 'A square shape',
    image: require('../../assets/images/square.png'),
    price: 15,
  },
  {
    id: 3,
    variant: 'TEA_CUP',
    name: 'Tea Cup',
    description: 'A cup of tea',
    image: require('../../assets/images/square1.png'),
    price: 12,
  },
  {
    id: 4,
    variant: 'CIRCLE',
    name: 'Circle',
    description: 'A circular shape',
    image: require('../../assets/images/square.png'),
    price: 20,
  },
  {
    id: 5,
    variant: 'MUG',
    name: 'Mug',
    description: 'A coffee mug',
    image: require('../../assets/images/square1.png'),
    price: 18,
  },
  {
    id: 6,
    variant: 'RECTANGLE',
    name: 'Rectangle',
    description: 'A rectangular shape',
    image: require('../../assets/images/square.png'),
    price: 25,
  },
];

export default useTimerVariant;
