import { useMemo, useState } from 'react';
import Select from 'react-select';

import { IItem, useItemsStore } from '../stores/itemsStore';
import EmptyView from './EmptyView';

type Value = 'default' | 'packed' | 'unpacked';

interface IOption {
  label: string;
  value: Value;
}

interface IItemButton {
  item: IItem;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}

const sortingOptions: IOption[] = [
  {
    label: 'Sort by default',
    value: 'default',
  },
  {
    label: 'Sort by packed',
    value: 'packed',
  },
  {
    label: 'Sort by unpacked',
    value: 'unpacked',
  },
];

export default function ItemList() {
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const [sortBy, setSortBy] = useState<Value>('default');

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === 'packed') {
          return Number(b.packed) - Number(a.packed);
        }

        if (sortBy === 'unpacked') {
          return Number(a.packed) - Number(b.packed);
        }

        return 0;
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length === 0 ? <EmptyView /> : null}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={(option) => {
              if (option) setSortBy(option.value);
            }}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      ) : null}

      {sortedItems.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={deleteItem}
            onToggleItem={toggleItem}
          />
        );
      })}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }: IItemButton) {
  return (
    <li className="item">
      <label>
        <input
          onClick={() => onToggleItem(item.id)}
          checked={item.packed}
          type="checkbox"
        />
        {item.name}
      </label>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
