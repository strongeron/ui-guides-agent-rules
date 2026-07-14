export function IbelickNoPrimitiveMixingGood() {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-sm">
        <p className="font-medium">One system per interaction surface:</p>
        <code className="block p-2 bg-muted rounded text-xs whitespace-pre">
          {`import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// The dialog surface is Radix all the way down.
<Dialog.Root>
  <Dialog.Content>          {/* Radix owns focus and Escape */}
    <DropdownMenu.Root>     {/* Radix knows it is nested; layers stack */}
      <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Rename</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Dialog.Content>
</Dialog.Root>

// A different surface elsewhere may use a different system.
// Base UI tabs in Settings is not a violation — converge
// surface by surface, don't big-bang the migration.`}
        </code>
      </div>
      <p className="text-xs text-success">
        One owner of focus and Escape per surface: the menu closes first, the dialog second, and focus lands back on
        the trigger
      </p>
    </div>
  );
}
