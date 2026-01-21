import { useState, useMemo } from 'react';

export function IbelickNoEffectRenderGood() {
  const [items] = useState(['Apple', 'Banana', 'Cherry', 'Date']);
  const [filter, setFilter] = useState('');

  // Good: Compute derived value during render
  const filteredItems = useMemo(
    () => items.filter((item) =>
      item.toLowerCase().includes(filter.toLowerCase())
    ),
    [items, filter]
  );

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
      <p className="text-xs text-success">
        useMemo computes during render - single render cycle, no extra re-renders
      </p>
    </div>
  );
}
