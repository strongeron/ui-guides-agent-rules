import { useState } from 'react';

export function ProportionalAnimationBad() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <button
          onClick={() => setShowDialog(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm active:scale-50 transition-transform"
        >
          Open Dialog
        </button>
        {showDialog && (
          <div
            className="bg-card border border-border rounded-lg p-4 shadow-lg animate-in zoom-in-0 duration-300"
          >
            <h4 className="text-sm font-medium text-foreground mb-2">Confirm Action</h4>
            <p className="text-sm text-muted-foreground mb-3">Are you sure you want to proceed?</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowDialog(false)} className="px-3 py-1.5 text-sm border border-border rounded text-foreground">Cancel</button>
              <button onClick={() => setShowDialog(false)} className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded">Confirm</button>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-error">Dialog scales from 0 → 1, button shrinks to 0.5 — disproportionate</p>
    </div>
  );
}
