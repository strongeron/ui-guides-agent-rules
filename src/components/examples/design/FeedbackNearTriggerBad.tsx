import { useState } from 'react';

export function FeedbackNearTriggerBad() {
  const [toast, setToast] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 relative min-h-[140px]">
        <button
          onClick={() => { setToast(true); setTimeout(() => setToast(false), 2000); }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          Copy Link
        </button>
        {toast && (
          <div className="absolute bottom-2 right-2 bg-foreground text-background text-xs px-3 py-2 rounded-lg shadow-lg">
            ✓ Copied to clipboard!
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-3">Feedback appears far from the button — easy to miss.</p>
      </div>
      <p className="text-xs text-error">Toast notification far from trigger — breaks attention flow</p>
    </div>
  );
}
