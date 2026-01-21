import { useState } from 'react';

export function IbelickManualBehaviorGood() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = ['Home', 'Profile', 'Settings'];

  // Note: In production, use Radix NavigationMenu or Listbox:
  // import * as NavigationMenu from '@radix-ui/react-navigation-menu';
  // All keyboard behavior handled automatically

  return (
    <div className="space-y-4">
      <div className="p-2 bg-muted rounded-lg">
        {items.map((item, i) => (
          <button
            key={item}
            role="option"
            aria-selected={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            className={`w-full text-left px-3 py-2 rounded transition-colors ${
              i === activeIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-muted-foreground/10'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="text-xs text-success">
        Radix handles: arrows, Home/End, type-ahead, disabled items, focus restore
      </p>
    </div>
  );
}
