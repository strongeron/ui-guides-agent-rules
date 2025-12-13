import { useState } from 'react';

export function OverscrollBehaviorGood() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Open Drawer
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto overscroll-contain">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold">Scrollable Drawer</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-700">Item {i + 1}</p>
                  <p className="text-xs text-gray-500">Scroll to bottom - it stops here!</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-green-700 mt-4">
        overscroll-behavior: contain prevents scroll chaining
      </p>
    </div>
  );
}
