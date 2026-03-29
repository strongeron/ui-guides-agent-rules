import { useState } from 'react';

export function DisabledNoTooltipsBad() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="relative inline-block">
          <button
            disabled
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm cursor-not-allowed"
          >
            Delete Project
          </button>
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap">
              You need admin access
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">Tab to the button — tooltip is invisible to keyboard users.</p>
      </div>
      <p className="text-xs text-error">Disabled buttons can't receive focus — tooltip inaccessible</p>
    </div>
  );
}
