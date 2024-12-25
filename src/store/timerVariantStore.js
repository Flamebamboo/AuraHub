import { create } from 'zustand';

import { saveUserDesigns, loadUserDesigns } from '@/lib/focusItem';
//mission move to the database
const useTimerVariant = create((set) => ({
  ownedItems: ['1'],
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
  loadItems: async () => {
    //fetch the user's owned items from the database
    try {
      const userItems = await loadUserDesigns();
      set({ ownedItems: userItems });
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

export default useTimerVariant;
