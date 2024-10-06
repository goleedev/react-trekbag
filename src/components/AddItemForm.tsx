import { useRef, useState } from 'react';

import { useItemsStore } from '../stores/itemsStore';
import Button from './Button';

export default function AddItemForm() {
  const [itemText, setItemText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addItem = useItemsStore((state) => state.addItem);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation
    if (!itemText) {
      alert("Item can't be empty");
      inputRef.current?.focus();
      return;
    }

    addItem(itemText);
    setItemText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        value={itemText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setItemText(e.target.value)
        }
        autoFocus
      />
      <Button buttonType="secondary">Add to List</Button>
    </form>
  );
}
