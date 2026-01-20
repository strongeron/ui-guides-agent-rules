import { useState, useEffect } from 'react';

export function IbelickNoEffectRenderBad() {
  const [items] = useState(['Apple', 'Banana', 'Cherry', 'Date']);
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  // Bad: Using useEffect to compute derived state
  useEffect(() => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, filter]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
        className="w-full px-3 py-2 border rounded-lg"
      />
      <ul className="space-y-1">
        {filteredItems.map((item) => (
          <li key={item} className="text-sm">{item}</li>
        ))}
      </ul>
      <p className="text-xs text-destructive">
        useEffect causes extra render: input → setState → render → effect → setState → render
      </p>
    </div>
  );
}
