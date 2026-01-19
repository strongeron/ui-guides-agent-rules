import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon, Settings02Icon } from '@hugeicons/core-free-icons';

export function RamsSemanticHandlersBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Non-Semantic Elements</h4>
        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-muted rounded-lg">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              onClick={() => {}}
              className="flex items-center gap-2 px-3 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Delete02Icon} size={16} />
              Delete
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <span
              onClick={() => {}}
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Settings02Icon} size={16} />
              Settings
            </span>
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">{'<div onClick={...}>Delete</div>'}</code>
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Divs with onClick lack keyboard support and proper roles
      </p>
    </div>
  );
}
