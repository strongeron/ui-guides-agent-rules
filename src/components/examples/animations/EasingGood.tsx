import { useState } from 'react';

export function EasingGood() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>Toggle Menu</span>
          <svg
            className="w-4 h-4"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 200ms ease-out',
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className="overflow-hidden"
          style={{
            maxHeight: isOpen ? '200px' : '0',
            transition: isOpen
              ? 'max-height 250ms ease-out'
              : 'max-height 200ms ease-in',
          }}
        >
          <div className="p-3 bg-muted rounded-lg">
            <div className="space-y-2">
              <div className="p-2 hover:bg-muted rounded">Option 1</div>
              <div className="p-2 hover:bg-muted rounded">Option 2</div>
              <div className="p-2 hover:bg-muted rounded">Option 3</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          ease-out for entering (decelerates), ease-in for leaving (accelerates away). Matches physical expectations.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Contextual easing - ease-out enter, ease-in exit
      </p>
    </div>
  );
}
