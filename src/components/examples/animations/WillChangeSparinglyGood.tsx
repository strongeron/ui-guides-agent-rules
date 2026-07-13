import { useState } from 'react';

export function WillChangeSparinglyGood() {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Hover any card. Same motion, no idle cost.</p>
      <div className="grid grid-cols-3 gap-2">
        {items.map((i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="h-14 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-medium transition-transform duration-200 ease-out hover:scale-105"
            // GOOD: will-change only while a hover is actually imminent
            style={{ willChange: hovered === i ? 'transform' : 'auto' }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <p className="text-xs text-success">
        Same hover scale, but <code>will-change</code> is set only on the card being hovered — no GPU memory reserved while idle
      </p>
    </div>
  );
}
