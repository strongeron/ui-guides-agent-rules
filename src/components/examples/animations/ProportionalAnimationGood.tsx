import { useState } from 'react';

export function ProportionalAnimationGood() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <button
          onClick={() => setShowDialog(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm active:scale-[0.97] transition-transform"
        >
          Open Dialog
        </button>
        {showDialog && (
          <div
            className="bg-card border border-border rounded-lg p-4 shadow-lg"
            style={{
              animation: 'proportional-fade-in 150ms ease-out forwards',
            }}
          >
            <style>{`
              @keyframes proportional-fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
            <h4 className="text-sm font-medium text-foreground mb-2">Confirm Action</h4>
            <p className="text-sm text-muted-foreground mb-3">Are you sure you want to proceed?</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowDialog(false)} className="px-3 py-1.5 text-sm border border-border rounded text-foreground">Cancel</button>
              <button onClick={() => setShowDialog(false)} className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded">Confirm</button>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-success">Dialog scales from 0.95, button to 0.97 — proportional to size</p>
    </div>
  );
}
