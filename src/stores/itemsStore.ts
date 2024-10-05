import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { initialItems } from '../lib/constants';

export interface IItem {
  id: number;
  name: string;
  packed: boolean;
}

export interface IState {
  items: IItem[];
  addItem: (newItemText: string) => void;
  deleteItem: (id: number) => void;
  toggleItem: (id: number) => void;
  removeAllItems: () => void;
  resetToInitial: () => void;
  markAllAsComplete: () => void;
  markAllAsIncomplete: () => void;
}

export const useItemsStore = create<IState>()(
  persist(
    (set) => ({
      items: initialItems,
      addItem: (newItemText: string) => {
        const newItem = {
          id: new Date().getTime(),
          name: newItemText,
          packed: false,
        };

        set((state: IState) => ({ items: [...state.items, newItem] }));
      },
      deleteItem: (id: number) => {
        set((state: IState) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return { items: newItems };
        });
      },
      toggleItem: (id: number) => {
        set((state: IState) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return { ...item, packed: !item.packed };
            }

            return item;
          });
          return { items: newItems };
        });
      },
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetToInitial: () => {
        set(() => ({ items: initialItems }));
      },
      markAllAsComplete: () => {
        set((state: IState) => {
          const newItems = state.items.map((item) => {
            return { ...item, packed: true };
          });

          return { items: newItems };
        });
      },
      markAllAsIncomplete: () => {
        set((state: IState) => {
          const newItems = state.items.map((item) => {
            return { ...item, packed: false };
          });

          return { items: newItems };
        });
      },
    }),
    {
      name: 'items',
    }
  )
);
