import { useState } from 'react';

type Action = 'Star' | 'Share' | 'Delete';

const ACTIONS: Action[] = ['Star', 'Share', 'Delete'];

/**
 * Same three 20px icons, but the row is laid out on a 44px pitch: each button
 * *is* 44px wide, so its hit area is as large as it can be while abutting —
 * never intersecting — its neighbours'. WCAG 2.2 SC 2.5.8 measures exactly this.
 */
export function HitTargetCollisionGood() {
  const [showAreas, setShowAreas] = useState(true);
  const [log, setLog] = useState<string[]>([]);

  const fire = (action: Action) => {
    setLog((prev) => [`Fired ${action.toUpperCase()}.`, ...prev].slice(0, 4));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">Row actions (20px icons, 44px pitch)</p>
          <button
            onClick={() => setShowAreas((v) => !v)}
            className="text-xs rounded-md border border-border px-2 py-1 text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showAreas ? 'Hide' : 'Show'} hit areas
          </button>
        </div>

        <div className="flex items-center py-4 px-6 rounded-md bg-muted">
          {ACTIONS.map((action) => (
            <button
              key={action}
              aria-label={action}
              onClick={() => fire(action)}
              // The button itself is the 44px target. No pseudo-element can overshoot
              // what it doesn't have: the areas tile the row, edge to edge.
              className={`grid size-11 place-items-center rounded-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
                showAreas ? 'bg-success/15 ring-1 ring-success' : ''
              } ${action === 'Delete' ? 'text-destructive' : ''}`}
            >
              {/* The icon stays 20px — only the target grew. */}
              <span aria-hidden className="grid size-5 place-items-center text-xs leading-none">
                {action === 'Star' ? '★' : action === 'Share' ? '↗' : '✕'}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          The rects abut, they never intersect. Every click lands on the icon under the cursor. If a 44px
          pitch had not fit, the rule is to shrink the areas until they only touch — never to let them overlap.
        </p>

        <ul className="mt-3 space-y-1 text-xs font-mono" aria-live="polite">
          {log.length === 0 ? (
            <li className="text-muted-foreground">Click the star. It stars.</li>
          ) : (
            log.map((entry, i) => (
              <li key={i} className="text-foreground">
                {entry}
              </li>
            ))
          )}
        </ul>
      </div>
      <p className="text-xs text-success mt-4">
        Hit areas as large as they can be without colliding — clicks go where they look
      </p>
    </div>
  );
}
