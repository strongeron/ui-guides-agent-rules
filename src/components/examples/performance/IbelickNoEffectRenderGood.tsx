import { useState, useMemo, useRef } from 'react';

export function IbelickNoEffectRenderGood() {
  const [items] = useState(['Apple', 'Banana', 'Cherry', 'Date']);
  const [filter, setFilter] = useState('');

  const renders = useRef(0);
  renders.current += 1;

  // Derived during render: no second pass.
  const filteredItems = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(filter.toLowerCase())),
    [items, filter]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Type a letter</span>
        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium tabular-nums text-success">
          renders: {renders.current}
        </span>
      </div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      />
      <ul className="space-y-1">
        {filteredItems.map((item) => (
          <li key={item} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
      <p className="text-xs text-success">
        This counter climbs half as fast. The filtered list is computed during render, so a keystroke costs one render
        pass instead of two
      </p>
    </div>
  );
}
