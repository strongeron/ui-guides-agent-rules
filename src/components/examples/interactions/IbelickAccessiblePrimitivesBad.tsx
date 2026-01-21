import { useState } from 'react';

export function IbelickAccessiblePrimitivesBad() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Open Menu
        </button>
        {isOpen && (
          <div className="absolute top-full mt-2 w-48 bg-popover border rounded-lg shadow-lg p-2">
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
      <p className="text-xs text-destructive">
        Custom dropdown: no keyboard nav, no focus trap, no ARIA roles
      </p>
    </div>
  );
}
