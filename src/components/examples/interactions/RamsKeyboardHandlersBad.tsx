import { useState } from 'react';

export function RamsKeyboardHandlersBad() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Click-Only Action</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              onClick={() => setCount((c) => c + 1)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Increment
            </div>
            <span className="font-mono text-lg">{count}</span>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">{'<div onClick={...}>Increment</div>'}</code>
          </div>
          <p className="text-sm text-muted-foreground">
            Tab to element, then try Enter - nothing happens
          </p>
        </div>
      </div>
      <p className="text-xs text-error">
        Only works with mouse - keyboard users cannot activate
      </p>
    </div>
  );
}
