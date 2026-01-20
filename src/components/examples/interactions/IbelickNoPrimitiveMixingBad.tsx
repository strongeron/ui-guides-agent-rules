export function IbelickNoPrimitiveMixingBad() {
  return (
    <div className="space-y-4">
      <div className="space-y-2 text-sm">
        <p className="font-medium">Mixed primitive libraries:</p>
        <code className="block p-2 bg-muted rounded text-xs">
          {`// Dialog from Radix
import * as Dialog from '@radix-ui/react-dialog';

// Menu from Headless UI
import { Menu } from '@headlessui/react';

// Tabs from React Aria
import { useTabList } from 'react-aria';`}
        </code>
      </div>
      <p className="text-xs text-destructive">
        Mixed libraries = inconsistent keyboard patterns, larger bundle, confusing DX
      </p>
    </div>
  );
}
