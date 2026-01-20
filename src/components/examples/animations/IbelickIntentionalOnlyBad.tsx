import { useState } from 'react';

export function IbelickIntentionalOnlyBad() {
  const [items] = useState(['Item 1', 'Item 2', 'Item 3']);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium animate-pulse">Settings</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={item}
            className="p-3 bg-muted rounded-lg transition-all duration-500 hover:scale-105 hover:shadow-lg hover:rotate-1"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="animate-bounce inline-block mr-2">•</span>
            {item}
          </li>
        ))}
      </ul>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg animate-pulse hover:animate-spin">
        Save
      </button>
      <p className="text-xs text-destructive mt-4">
        Excessive animations distract from the content and slow down interaction
      </p>
    </div>
  );
}
