import { useState } from 'react';

export function OverscrollBehaviorGood() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Open Drawer
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-overlay z-50">
          <div className="fixed right-0 top-0 h-full w-80 bg-card shadow-xl overflow-y-auto overscroll-contain">
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
                  <p className="text-xs text-muted-foreground">Scroll to bottom - it stops here!</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-success mt-4">
        overscroll-behavior: contain prevents scroll chaining
      </p>
    </div>
  );
}
