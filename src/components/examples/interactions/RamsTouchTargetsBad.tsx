import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, PencilEdit02Icon, Copy01Icon } from '@hugeicons/core-free-icons';

export function RamsTouchTargetsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Small Touch Targets</h4>
        <div className="space-y-3">
          <div className="flex gap-1 p-3 bg-muted rounded-lg items-center">
            <button
              aria-label="Edit"
              className="p-1 hover:bg-background rounded transition-colors"
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={14} />
            </button>
            <button
              aria-label="Copy"
              className="p-1 hover:bg-background rounded transition-colors"
            >
              <HugeiconsIcon icon={Copy01Icon} size={14} />
            </button>
            <button
              aria-label="Delete"
              className="p-1 hover:bg-background rounded transition-colors text-destructive"
            >
              <HugeiconsIcon icon={Delete02Icon} size={14} />
            </button>
            <span className="text-xs text-muted-foreground ml-2">~22px targets</span>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">p-1 with 14px icon = ~22px total</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Difficult to tap accurately, especially on mobile
      </p>
    </div>
  );
}
