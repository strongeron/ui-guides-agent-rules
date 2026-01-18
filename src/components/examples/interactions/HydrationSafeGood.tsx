import { useState, useEffect, useRef } from 'react';

export function HydrationSafeGood() {
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    // Simulating hydration - input stays the same, just becomes interactive
    const timer = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Search
        </label>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start typing..."
          className="w-full px-3 py-2 border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {mounted
            ? 'Hydrated! Input preserved focus and value during hydration.'
            : 'Hydrating... Input stays interactive.'}
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Same input element persists - focus and value preserved
      </p>
    </div>
  );
}
