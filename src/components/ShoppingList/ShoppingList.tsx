import { useState, type ChangeEvent } from "react";
import type { Item } from "../../types/types";

export const ShoppingList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleAdd = () => {
    const value = input.trim();
    if (value) {
      const item: Item = {
        id: Date.now().toString(),
        item: value,
      };
      setItems(prev => [...prev, item]);
      setInput("");
    }
  };

  const handleClearAll = () => setItems([]);

  const handleDelete = (id: Item["id"]) =>
    setItems(prev => prev.filter(item => id !== item.id));

  return (
    <div data-testid="shopping-list">
      <h1>Shopping list</h1>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Add item"
      />
      <button
        onClick={handleAdd}
        disabled={!input.trim()}
      >
        Add
      </button>
      <button onClick={handleClearAll}>Clear all</button>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <p>{item.item}</p>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no items yet.</p>
      )}
    </div>
  );
};
