import { useState, type ChangeEvent } from "react";

export const ShoppingList = () => {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleAdd = () => {
    const value = input.trim();
    if (value) {
      setItems(prev => [...prev, value]);
      setInput("");
    }
  };

  const handleClearAll = () => setItems([]);

  const handleDelete = (index: number) =>
    setItems(prev => prev.filter((_, i) => i !== index));

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
      <ul>
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              <p>{item}</p>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))
        ) : (
          <p>There is no items yet</p>
        )}
      </ul>
    </div>
  );
};
