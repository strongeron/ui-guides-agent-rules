import { useState } from 'react';

export function WillChangeSparinglyGood() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {items.map((i) => (
          <div
            key={i}
            className="h-12 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs font-medium transition-transform duration-200 hover:scale-105"
            style={{
              // GOOD: will-change only applied on hover (when animation is imminent)
              willChange: hoveredCard === i ? 'transform' : 'auto',
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <p className="text-xs text-success">
        ✓ will-change applied only during hover - removes after animation, saves GPU memory
      </p>
    </div>
  );
}
