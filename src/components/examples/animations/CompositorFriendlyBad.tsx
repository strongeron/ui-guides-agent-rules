import { useState } from 'react';

export function CompositorFriendlyBad() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Toggle Panel
      </button>
      <div
        className={`mt-4 bg-gray-100 rounded-lg overflow-hidden transition-height ${
          isExpanded ? 'h-[200px]' : 'h-0'
        }`}
      >
        <div className="p-4">
          <h3 className="font-medium mb-2">Panel Content</h3>
          <p className="text-sm text-gray-600">
            This panel animates using height, which triggers layout recalculation
            and can cause jank.
          </p>
        </div>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Animating height causes reflows and poor performance
      </p>
    </div>
  );
}
