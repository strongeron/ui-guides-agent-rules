export function IbelickNoPrimitiveMixingBad() {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-sm">
        <p className="font-medium">Two primitive systems inside one dialog:</p>
        <code className="block p-2 bg-muted rounded text-xs whitespace-pre">
          {`import * as Dialog from '@radix-ui/react-dialog';
import { Menu } from '@headlessui/react';

// One surface, two owners of focus and Escape.
<Dialog.Root>
  <Dialog.Content>          {/* Radix traps focus, listens for Escape */}
    <Menu>                  {/* Headless UI also traps focus, also listens */}
      <Menu.Button>Actions</Menu.Button>
      <Menu.Items>
        <Menu.Item>Rename</Menu.Item>
      </Menu.Items>
    </Menu>
  </Dialog.Content>
</Dialog.Root>`}
        </code>
      </div>
      <p className="text-xs text-destructive">
        Both systems claim the same surface: Escape closes the dialog instead of just the menu, and on close focus
        returns to whichever library won the race — not to the button you opened
      </p>
    </div>
  );
}
