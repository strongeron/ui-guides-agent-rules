import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, Settings02Icon } from '@hugeicons/core-free-icons';

export function RamsSemanticHandlersGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Semantic Elements</h4>
        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-muted rounded-lg">
            <button className="flex items-center gap-2 px-3 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors">
              <HugeiconsIcon icon={Delete02Icon} size={16} />
              Delete
            </button>
            <a
              href="#settings"
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              <HugeiconsIcon icon={Settings02Icon} size={16} />
              Settings
            </a>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code>{'<button>Delete</button>'}</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Native elements have built-in keyboard support and ARIA roles
      </p>
    </div>
  );
}
