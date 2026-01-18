import { useState } from 'react';

export function OverscrollBehaviorBad() {
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
          <div className="fixed right-0 top-0 h-full w-80 bg-card shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold">Scrollable Drawer</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="py-3 border-b border-border">
                  <p className="text-sm text-foreground">Item {i + 1}</p>
                  <p className="text-xs text-muted-foreground">Scroll to bottom, then keep scrolling...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-error mt-4">
        Scroll chaining - reaching end scrolls page behind
      </p>
    </div>
  );
}
