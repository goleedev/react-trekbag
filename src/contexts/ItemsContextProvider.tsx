import { createContext, useState } from 'react';
import { IItem } from '../stores/itemsStore';
import { initialItems } from '../lib/constants';

interface ItemsContextType {
  items: IItem[];
  addItem: (name: string) => void;
}

export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined
);

interface ItemsProviderProps {
  children: React.ReactNode;
}

export function ItemsContextProvider({ children }: ItemsProviderProps) {
  const [items, setItems] = useState<IItem[]>(initialItems);

  const addItem = (name: string) => {
    setItems(
      items.concat({
        id: new Date().getTime(),
        name,
        packed: false,
      })
    );
  };

  const contextValue: ItemsContextType = {
    items,
    addItem,
  };

  return (
    <ItemsContext.Provider value={contextValue}>
      {children}
    </ItemsContext.Provider>
  );
}
