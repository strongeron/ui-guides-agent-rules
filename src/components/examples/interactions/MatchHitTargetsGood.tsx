import { useState } from 'react';
import { X } from 'lucide-react';

export function MatchHitTargetsGood() {
  const [showArea, setShowArea] = useState(true);
  const [hits, setHits] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <label className="flex w-fit cursor-pointer items-center gap-2 text-xs text-muted-foreground select-none">
        <input
          type="checkbox"
          checked={showArea}
          onChange={(e) => setShowArea(e.target.checked)}
          className="accent-success"
        />
        Show hit area
      </label>

      <div className="flex items-center justify-between rounded-lg bg-muted p-4">
        <span className="text-sm">Notification message</span>
        <button
          onClick={() => setHits((n) => n + 1)}
          className={`-m-2 rounded p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
            showArea ? 'bg-success/20 ring-2 ring-inset ring-success' : ''
          }`}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-success">
        {hits > 0
          ? `Clicked ${hits}× — the 32px padded target catches every tap.`
          : 'Padding expands the hit target to 32px while the icon stays 16px. Toggle the box, then click anywhere inside it.'}
      </p>
    </div>
  );
}
