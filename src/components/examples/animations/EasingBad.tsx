import { useState } from 'react';

export function EasingBad() {
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
              transition: 'transform 300ms linear',
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
            transition: 'max-height 300ms linear',
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
          Linear easing feels robotic and mechanical. The motion lacks natural feel.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        Linear easing - robotic, unnatural motion
      </p>
    </div>
  );
}
