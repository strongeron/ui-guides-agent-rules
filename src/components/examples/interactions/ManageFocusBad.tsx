import { useState } from 'react';

export function ManageFocusBad() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-80 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
            <p className="text-sm text-muted-foreground mb-4">
              This modal has no focus trap. Try tabbing - focus escapes to the page behind.
            </p>
            <input
              type="text"
              placeholder="Type here..."
              className="w-full px-3 py-2 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-muted-foreground hover:bg-muted rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-error mt-4">
        No focus trap - Tab escapes modal, focus not returned on close
      </p>
    </div>
  );
}
