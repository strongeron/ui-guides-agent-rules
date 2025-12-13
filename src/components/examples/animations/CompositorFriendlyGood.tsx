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
          className="bg-gray-100 rounded-lg origin-top"
          style={{
            transform: isExpanded ? 'scaleY(1)' : 'scaleY(0)',
            opacity: isExpanded ? 1 : 0,
            transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out'
          }}
        >
          <div className="p-4">
            <h3 className="font-medium mb-2">Panel Content</h3>
            <p className="text-sm text-gray-600">
              This panel animates using transform and opacity, which are GPU-accelerated and smooth.
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Transform and opacity are compositor-friendly
      </p>
    </div>
  );
}
