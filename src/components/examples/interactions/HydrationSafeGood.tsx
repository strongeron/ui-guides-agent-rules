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
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start typing..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-xs text-gray-500">
          {mounted
            ? 'Hydrated! Input preserved focus and value during hydration.'
            : 'Hydrating... Input stays interactive.'}
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Same input element persists - focus and value preserved
      </p>
    </div>
  );
}
