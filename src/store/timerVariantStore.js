import { create } from 'zustand';

import { saveUserDesigns } from '@/lib/appwrite';

const useTimerVariant = create((set) => ({
  items: designItems,
  ownedItems: [1],
  variant: 'COFFEE_CUP',
  purchaseItem: (id) => {
    try {
      set((state) => {
        const newOwnedItems = [...state.ownedItems, id]; //add the purchase id to the ownedItems array
        saveUserDesigns(newOwnedItems);
        return { ownedItems: newOwnedItems };
      });
    } catch (error) {
      console.log(error);
    }
  },
  setVariant: (name) => set({ variant: name }),
}));

// Integrate the Shop with the Database:

// Instead of using hardcoded data in timerVariantStore, fetch the focus designs dynamically from your Appwrite database using getFocusItems.
// Update focus-design.jsx to display the designs fetched from the database.
// Implement Purchase and Ownership Logic:

// Store purchased items in the database, associated with the user's data.
// Update the purchaseItem function in timerVariantStore to reflect ownership status in the database.
// Ensure that the ownership status persists across sessions and devices.
export const designItems = [
  {
    id: 1,
    variant: 'COFFEE_CUP',
    name: 'Coffee Cup',
    description: 'A cup of coffee',
    image: require('../../assets/images/square1.png'),
    price: '$2',
  },
  {
    id: 2,
    variant: 'SQUARE',
    name: 'Square',
    description: 'A square shape',
    image: require('../../assets/images/square.png'),
    price: '$2',
  },
  {
    id: 3,
    variant: 'TEA_CUP',
    name: 'Tea Cup',
    description: 'A cup of tea',
    image: require('../../assets/images/square1.png'),
    price: '$2',
  },
  {
    id: 4,
    variant: 'CIRCLE',
    name: 'Circle',
    description: 'A circular shape',
    image: require('../../assets/images/square.png'),
    price: '$2',
  },
  {
    id: 5,
    variant: 'MUG',
    name: 'Mug',
    description: 'A coffee mug',
    image: require('../../assets/images/square1.png'),
    price: '$2',
  },
  {
    id: 6,
    variant: 'RECTANGLE',
    name: 'Rectangle',
    description: 'A rectangular shape',
    image: require('../../assets/images/square.png'),
    price: '$2',
  },
  {
    id: 7,
    variant: 'Chips',
    name: 'Chips',
    description: 'A coffee mug',
    image: require('../../assets/images/square1.png'),
    price: '$2',
  },
  {
    id: 8,
    variant: 'Water',
    name: 'Water',
    description: 'A rectangular shape',
    image: require('../../assets/images/square.png'),
    price: '$2',
  },
];

export default useTimerVariant;
