import { useState } from 'react';

export function ListDeleteShortcutBad() {
  const [items] = useState(['Design review', 'Code cleanup', 'Write tests', 'Deploy staging']);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-2 space-y-1">
        {items.map((item) => (
          <div
            key={item}
            tabIndex={0}
            className="flex items-center justify-between px-3 py-2 rounded text-sm text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-error">No keyboard shortcut to delete items — mouse only</p>
    </div>
  );
}
