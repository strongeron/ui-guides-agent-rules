import { useState } from 'react';

export function CompositorFriendlyGood() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Toggle Panel
      </button>
      <div className="mt-4 overflow-hidden">
        <div
          className={`bg-muted rounded-lg origin-top transition-transform-opacity ${
            isExpanded
              ? 'scale-y-100 opacity-100'
              : 'scale-y-0 opacity-0'
          }`}
        >
          <div className="p-4">
            <h3 className="font-medium mb-2">Panel Content</h3>
            <p className="text-sm text-muted-foreground">
              This panel animates using transform and opacity, which are
              GPU-accelerated and smooth.
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Transform and opacity are compositor-friendly
      </p>
    </div>
  );
}
