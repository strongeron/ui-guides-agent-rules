import { useState } from 'react';

export function FontWeightHoverStableBad() {
  const [hovered, setHovered] = useState<number | null>(null);
  const items = ['Dashboard', 'Analytics', 'Settings', 'Profile'];

  return (
    <div className="w-full max-w-sm space-y-4">
      <nav className="bg-card border border-border rounded-lg p-2">
        {items.map((item, i) => (
          <button
            key={item}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
              hovered === i
                ? 'font-bold text-foreground bg-muted'
                : 'font-normal text-muted-foreground'
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
      <p className="text-xs text-error">Font weight changes on hover — causes layout shift</p>
    </div>
  );
}
