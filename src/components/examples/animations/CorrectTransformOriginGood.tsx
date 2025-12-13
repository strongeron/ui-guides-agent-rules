import { useState } from 'react';

export function CorrectTransformOriginGood() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Open Menu
      </button>
      {isOpen && (
        <div
          className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1 origin-top-left"
          style={{
            animation: 'scaleInFromTop 200ms ease-out'
          }}
        >
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Edit
          </button>
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Delete
          </button>
        </div>
      )}
      <style>{`
        @keyframes scaleInFromTop {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <p className="text-xs text-green-700 mt-4">
        Menu scales from top-left, connected to the button
      </p>
    </div>
  );
}
