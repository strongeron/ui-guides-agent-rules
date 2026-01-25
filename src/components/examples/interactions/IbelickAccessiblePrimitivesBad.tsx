import { useState } from 'react';

export function IbelickAccessiblePrimitivesBad() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* BAD: Hand-rolled dropdown without accessibility */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          // BAD: Missing aria-expanded, aria-haspopup
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Open Menu
        </button>
        {isOpen && (
          // BAD: No role="menu", no focus trap, no keyboard navigation
          // BAD: Clicking outside doesn't close, Escape doesn't close
          <div className="absolute top-full mt-2 w-48 bg-popover border rounded-lg shadow-lg p-2 z-10">
            {/* BAD: divs instead of buttons, no role="menuitem" */}
            {/* BAD: Can't navigate with arrow keys */}
            {/* BAD: No focus management - can't tab to these */}
            <div
              className="px-3 py-2 hover:bg-muted rounded cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Option 1
            </div>
            <div
              className="px-3 py-2 hover:bg-muted rounded cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Option 2
            </div>
            <div
              className="px-3 py-2 hover:bg-muted rounded cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Option 3
            </div>
          </div>
        )}
      </div>

      {/* BAD: Hand-rolled modal without accessibility */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-muted rounded-lg"
      >
        Open Modal
      </button>
      {modalOpen && (
        // BAD: No focus trap - can tab to elements behind modal
        // BAD: No role="dialog", no aria-modal
        // BAD: No return focus to trigger on close
        // BAD: Escape doesn't close
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-popover p-6 rounded-lg w-80">
            <h3 className="font-medium mb-4">Modal Title</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try tabbing - focus escapes this modal!
            </p>
            <input
              type="text"
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <p className="text-xs text-destructive">
        Hand-rolled components: no keyboard nav, no focus trap, no ARIA, no Escape to close
      </p>
    </div>
  );
}
