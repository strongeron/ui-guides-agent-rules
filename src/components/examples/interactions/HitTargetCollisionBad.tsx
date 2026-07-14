import { useRef, useState } from 'react';

type Action = 'Star' | 'Share' | 'Delete';

const ACTIONS: Action[] = ['Star', 'Share', 'Delete'];
const GLYPH: Record<Action, string> = { Star: '★', Share: '↗', Delete: '✕' };

/**
 * Each 20px button dutifully expands to a 44px hit area with a pseudo-element,
 * exactly as the "expand small hit targets" rule says. With a 4px gap the
 * neighbouring areas overlap by ~20px, and nothing resolves that but paint order:
 * later siblings paint on top, so each button's ::after steals the right-hand
 * side of the button before it. The browser does the hit-testing here — we only
 * measure, after the fact, which icon the pointer was actually over.
 */
export function HitTargetCollisionBad() {
  const [showAreas, setShowAreas] = useState(true);
  const [log, setLog] = useState<string[]>([]);
  const iconRefs = useRef<Partial<Record<Action, HTMLSpanElement | null>>>({});

  /** Which icon is under this point? That is what the user was aiming at. */
  const aimedAt = (clientX: number, clientY: number): Action | null =>
    ACTIONS.find((action) => {
      const rect = iconRefs.current[action]?.getBoundingClientRect();
      if (!rect) return false;
      return (
        clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
      );
    }) ?? null;

  const handleClick = (fired: Action, e: React.MouseEvent) => {
    // Keyboard activation reports 0,0 — no pointer, so no misfire to detect.
    const target = e.detail === 0 ? fired : aimedAt(e.clientX, e.clientY);
    const misfire = target !== null && target !== fired;

    setLog((prev) =>
      [
        misfire
          ? `Pointer was over "${target}" → fired ${fired.toUpperCase()}.`
          : `Fired ${fired.toUpperCase()}.`,
        ...prev,
      ].slice(0, 4),
    );
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">Row actions (20px icons, 4px gap)</p>
          <button
            onClick={() => setShowAreas((v) => !v)}
            className="text-xs rounded-md border border-border px-2 py-1 text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showAreas ? 'Hide' : 'Show'} hit areas
          </button>
        </div>

        {/* Generous padding so the 44px areas have room to spill — and to collide. */}
        <div className="flex items-center gap-1 py-5 px-8 rounded-md bg-muted">
          {ACTIONS.map((action) => (
            <button
              key={action}
              aria-label={action}
              onClick={(e) => handleClick(action, e)}
              // A flat 44px pseudo-element, sized with no regard for what sits next to it.
              className={`relative grid size-5 place-items-center rounded-sm after:absolute after:left-1/2 after:top-1/2 after:size-11 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
                showAreas ? 'after:bg-destructive/15 after:ring-1 after:ring-destructive' : ''
              } ${action === 'Delete' ? 'text-destructive' : 'text-foreground'}`}
            >
              <span ref={(el) => { iconRefs.current[action] = el; }} aria-hidden className="text-xs leading-none">
                {GLYPH[action]}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Turn the hit areas on: they overlap by ~20px. Every button got its 44px; nobody checked whether
          they fit. Click the <span className="text-foreground">right half of ✕&apos;s neighbour ↗</span> —
          Delete is painted last, so Delete&apos;s area is on top, and Delete is what fires.
        </p>

        <ul className="mt-3 space-y-1 text-xs font-mono" aria-live="polite">
          {log.length === 0 ? (
            <li className="text-muted-foreground">Click the right edge of an icon. Watch what fires.</li>
          ) : (
            log.map((entry, i) => (
              <li key={i} className={entry.includes('was over') ? 'text-destructive' : 'text-foreground'}>
                {entry}
              </li>
            ))
          )}
        </ul>
      </div>
      <p className="text-xs text-destructive mt-4">
        Overlapping hit areas — the later-painted button steals clicks aimed at its neighbour, destructively
      </p>
    </div>
  );
}
