import { useState, useRef } from 'react';

export function ListDeleteShortcutGood() {
  const [items, setItems] = useState(['Design review', 'Code cleanup', 'Write tests', 'Deploy staging']);
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const children = listRef.current?.children;
    if (!children) return;

    if (e.key === 'ArrowDown' && index < items.length - 1) {
      e.preventDefault();
      (children[index + 1] as HTMLElement).focus();
    } else if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      (children[index - 1] as HTMLElement).focus();
    } else if (e.key === 'Backspace' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setItems(prev => prev.filter((_, i) => i !== index));
      requestAnimationFrame(() => {
        const next = children[Math.min(index, items.length - 2)] as HTMLElement;
        next?.focus();
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div ref={listRef} className="bg-card border border-border rounded-lg p-2 space-y-1" role="listbox">
        {items.map((item, i) => (
          <div
            key={item}
            tabIndex={0}
            role="option"
            aria-selected={false}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="flex items-center justify-between px-3 py-2 rounded text-sm text-foreground hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>{item}</span>
            <span className="text-xs text-muted-foreground">⌘⌫</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-success">↑↓ to navigate, ⌘+Backspace to delete — full keyboard support</p>
    </div>
  );
}
