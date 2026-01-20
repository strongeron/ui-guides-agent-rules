export function IbelickNoPrimitiveMixingGood() {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-sm">
        <p className="font-medium">Consistent primitive library:</p>
        <code className="block p-2 bg-muted rounded text-xs">
          {`// All components from Radix
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tabs from '@radix-ui/react-tabs';
import * as Tooltip from '@radix-ui/react-tooltip';`}
        </code>
      </div>
      <p className="text-xs text-success">
        One library = consistent behavior, smaller bundle, predictable API
      </p>
    </div>
  );
}
