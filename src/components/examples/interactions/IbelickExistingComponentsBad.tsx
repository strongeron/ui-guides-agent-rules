import { useState } from 'react';

export function IbelickExistingComponentsBad() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm">Custom toggle:</span>
        <div
          onClick={() => setIsOn(!isOn)}
          className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
            isOn ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <div
            className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${
              isOn ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </div>
      </div>
      <p className="text-xs text-destructive">
        Custom toggle: no keyboard support, no ARIA, no focus indicator
      </p>
    </div>
  );
}
