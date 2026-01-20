import { useState, useRef, useEffect } from 'react';

export function IbelickManualBehaviorBad() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = ['Home', 'Profile', 'Settings'];
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Manual keyboard navigation - incomplete implementation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (index + 1) % items.length;
      setActiveIndex(next);
      itemsRef.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      setActiveIndex(prev);
      itemsRef.current[prev]?.focus();
    }
  };

  useEffect(() => {
    itemsRef.current[activeIndex]?.focus();
  }, [activeIndex]);

  return (
    <div className="space-y-4">
      <div className="p-2 bg-muted rounded-lg" role="listbox">
        {items.map((item, i) => (
          <button
            key={item}
            ref={(el) => { itemsRef.current[i] = el; }}
            role="option"
            aria-selected={i === activeIndex}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onClick={() => setActiveIndex(i)}
            className={`w-full text-left px-3 py-2 rounded ${
              i === activeIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-muted-foreground/10'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="text-xs text-destructive">
        Manual keyboard handling misses: Home/End, type-ahead, disabled items, RTL
      </p>
    </div>
  );
}
