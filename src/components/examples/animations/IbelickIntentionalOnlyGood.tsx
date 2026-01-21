import { useState } from 'react';

export function IbelickIntentionalOnlyGood() {
  const [items] = useState(['Item 1', 'Item 2', 'Item 3']);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Settings</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="p-3 bg-muted rounded-lg transition-colors hover:bg-muted/80"
          >
            <span className="mr-2">•</span>
            {item}
          </li>
        ))}
      </ul>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-colors hover:bg-primary/90">
        Save
      </button>
      <p className="text-xs text-success mt-4">
        Subtle hover feedback only - no unnecessary animation
      </p>
    </div>
  );
}
