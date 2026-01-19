import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, PencilEdit02Icon, Copy01Icon } from '@hugeicons/core-free-icons';

export function RamsTouchTargetsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">44px+ Touch Targets</h4>
        <div className="space-y-3">
          <div className="flex gap-2 p-3 bg-muted rounded-lg">
            <button
              aria-label="Edit"
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-background rounded-md transition-colors"
            >
              <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
            </button>
            <button
              aria-label="Copy"
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-background rounded-md transition-colors"
            >
              <HugeiconsIcon icon={Copy01Icon} size={20} />
            </button>
            <button
              aria-label="Delete"
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-background rounded-md transition-colors text-destructive"
            >
              <HugeiconsIcon icon={Delete02Icon} size={20} />
            </button>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code>min-w-[44px] min-h-[44px]</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Easy to tap on mobile - meets WCAG 2.5.5 AAA
      </p>
    </div>
  );
}
