import { useState } from 'react';

export function IbelickAccessiblePrimitivesGood() {
  const [isOpen, setIsOpen] = useState(false);

  // Note: In production, use Radix DropdownMenu:
  // import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
  // <DropdownMenu.Root>
  //   <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
  //   <DropdownMenu.Portal>
  //     <DropdownMenu.Content>
  //       <DropdownMenu.Item>Option 1</DropdownMenu.Item>
  //     </DropdownMenu.Content>
  //   </DropdownMenu.Portal>
  // </DropdownMenu.Root>

  return (
    <div className="space-y-4">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Open Menu (Radix)
        </button>
        {isOpen && (
          <div
            role="menu"
            className="absolute top-full mt-2 w-48 bg-popover border rounded-lg shadow-lg p-2"
          >
            <button
              role="menuitem"
              className="w-full text-left px-3 py-2 hover:bg-muted rounded"
              onClick={() => setIsOpen(false)}
            >
              Option 1
            </button>
            <button
              role="menuitem"
              className="w-full text-left px-3 py-2 hover:bg-muted rounded"
              onClick={() => setIsOpen(false)}
            >
              Option 2
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-success">
        Radix handles keyboard nav, focus trap, ARIA, and Escape to close
      </p>
    </div>
  );
}
