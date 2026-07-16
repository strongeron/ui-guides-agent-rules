import { useState } from 'react';

export function RamsKeyboardHandlersGood() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Keyboard-Accessible Actions</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
            >
              Increment
            </button>
            <span className="font-mono text-lg">{count}</span>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code>{'<button onClick={...}>Increment</button>'}</code>
          </div>
          <p className="text-sm text-muted-foreground">
            Try pressing Tab then Enter/Space
          </p>
        </div>
      </div>
      <p className="text-xs text-success">
        Works with click, Enter key, and Space key
      </p>
    </div>
  );
}
