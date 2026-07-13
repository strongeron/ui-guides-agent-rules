import { useState, useEffect, useRef } from 'react';

export function IbelickNoEffectRenderBad() {
  const [items] = useState(['Apple', 'Banana', 'Cherry', 'Date']);
  const [filter, setFilter] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  const renders = useRef(0);
  renders.current += 1;

  // Derived state via an effect: render, then setState, then render again.
  useEffect(() => {
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(filter.toLowerCase())));
  }, [items, filter]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Type a letter</span>
        <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium tabular-nums text-destructive">
          renders: {renders.current}
        </span>
      </div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <ul className="space-y-1">
        {filteredItems.map((item) => (
          <li key={item} className="text-sm">
            {item}
          </li>
        ))}
      </ul>
      <p className="text-xs text-destructive">
        This counter climbs twice as fast as the Good one: the input sets state, React renders, then the effect sets
        state again and React renders a second time. (React double-renders in development, so both numbers are
        doubled. The ratio is the point.)
      </p>
    </div>
  );
}
