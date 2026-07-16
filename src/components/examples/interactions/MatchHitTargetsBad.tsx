import { useState } from 'react';
import { X } from 'lucide-react';

export function MatchHitTargetsBad() {
  const [showArea, setShowArea] = useState(true);
  const [hits, setHits] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <label className="flex w-fit cursor-pointer items-center gap-2 text-xs text-muted-foreground select-none">
        <input
          type="checkbox"
          checked={showArea}
          onChange={(e) => setShowArea(e.target.checked)}
          className="accent-error"
        />
        Show hit area
      </label>

      <div className="flex items-center justify-between rounded-lg bg-muted p-4">
        <span className="text-sm">Notification message</span>
        <button
          onClick={() => setHits((n) => n + 1)}
          className={`rounded text-muted-foreground transition-colors hover:text-foreground ${
            showArea ? 'bg-error/20 ring-2 ring-inset ring-error' : ''
          }`}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-error">
        {hits > 0
          ? `Clicked ${hits}× — but only if you landed on the bare 16px icon.`
          : 'The hit target is just the 16px icon. Toggle the box, then try to click it — easy to miss.'}
      </p>
    </div>
  );
}
