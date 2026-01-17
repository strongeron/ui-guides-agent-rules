import { useState, useEffect } from 'react';

export function HydrationSafeBad() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulating hydration delay
    const timer = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Search
        </label>
        {mounted ? (
          <input
            type="text"
            placeholder="Start typing..."
            className="w-full px-3 py-2 border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <div className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground">
            Loading...
          </div>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Input is replaced after hydration, losing any typed content and focus.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Input replaced on hydration - focus and value lost
      </p>
    </div>
  );
}
