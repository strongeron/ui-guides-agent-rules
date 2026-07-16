import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, PencilEdit02Icon, Copy01Icon } from '@hugeicons/core-free-icons';

const actions = [
  { label: 'Edit', icon: PencilEdit02Icon, tone: '' },
  { label: 'Copy', icon: Copy01Icon, tone: '' },
  { label: 'Delete', icon: Delete02Icon, tone: 'text-destructive' },
];

export function RamsTouchTargetsBad() {
  const [showArea, setShowArea] = useState(true);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">Small Touch Targets</h4>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground select-none">
            <input
              type="checkbox"
              checked={showArea}
              onChange={(e) => setShowArea(e.target.checked)}
              className="accent-error"
            />
            Show hit area
          </label>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-1 p-3 bg-muted rounded-lg">
            {actions.map(({ label, icon, tone }) => (
              <button
                key={label}
                aria-label={label}
                className={`rounded p-1 transition-colors hover:bg-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${tone} ${
                  showArea ? 'bg-error/20 ring-2 ring-inset ring-error' : ''
                }`}
              >
                <HugeiconsIcon icon={icon} size={14} />
              </button>
            ))}
            <span className="ml-2 text-xs text-muted-foreground">~22px targets</span>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">p-1 with 14px icon = ~22px total</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Toggle the boxes: each target is only ~22px, packed tight — hard to tap accurately on mobile.
      </p>
    </div>
  );
}
