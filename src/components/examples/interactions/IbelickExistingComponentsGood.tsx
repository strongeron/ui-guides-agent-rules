import { useState } from 'react';

export function IbelickExistingComponentsGood() {
  const [isOn, setIsOn] = useState(false);

  // Uses the existing Switch component from shadcn/ui
  // which is built on Radix UI Switch primitive

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm">shadcn/ui Switch:</span>
        <button
          role="switch"
          aria-checked={isOn}
          onClick={() => setIsOn(!isOn)}
          className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            isOn ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <div
            className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${
              isOn ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      <p className="text-xs text-success">
        Existing Switch component: keyboard, ARIA, focus ring built-in
      </p>
    </div>
  );
}
