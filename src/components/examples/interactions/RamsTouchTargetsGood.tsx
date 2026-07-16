import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, PencilEdit02Icon, Copy01Icon } from '@hugeicons/core-free-icons';

const actions = [
  { label: 'Edit', icon: PencilEdit02Icon, tone: '' },
  { label: 'Copy', icon: Copy01Icon, tone: '' },
  { label: 'Delete', icon: Delete02Icon, tone: 'text-destructive' },
];

export function RamsTouchTargetsGood() {
  const [showArea, setShowArea] = useState(true);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">44px+ Touch Targets</h4>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground select-none">
            <input
              type="checkbox"
              checked={showArea}
              onChange={(e) => setShowArea(e.target.checked)}
              className="accent-success"
            />
            Show hit area
          </label>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2 p-3 bg-muted rounded-lg">
            {actions.map(({ label, icon, tone }) => (
              <button
                key={label}
                aria-label={label}
                className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-3 transition-colors hover:bg-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${tone} ${
                  showArea ? 'bg-success/20 ring-2 ring-inset ring-success' : ''
                }`}
              >
                <HugeiconsIcon icon={icon} size={20} />
              </button>
            ))}
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code>min-w-[44px] min-h-[44px]</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Toggle the boxes: each target is a full 44px — easy to tap, meets WCAG 2.5.5 AAA.
      </p>
    </div>
  );
}
