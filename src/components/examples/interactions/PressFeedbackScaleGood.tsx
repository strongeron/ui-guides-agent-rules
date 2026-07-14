import { useState } from 'react';

// scale(0.97) + 160ms ease-out. Subtle enough to read as "pressed", not as "collapsed".
const press =
  'transition-transform duration-[160ms] ease-out active:scale-[0.97] motion-reduce:transition-none';

export function PressFeedbackScaleGood() {
  const [log, setLog] = useState<string[]>([]);
  const record = (what: string) =>
    setLog((prev) => [`${what} — pressed, scaled to 0.97`, ...prev].slice(0, 3));

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <button
          type="button"
          onPointerDown={() => record('Primary button')}
          className={`w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90 ${press}`}
        >
          Save changes
        </button>

        <button
          type="button"
          onPointerDown={() => record('Card')}
          className={`flex w-full items-center gap-2 rounded-md border border-border bg-muted p-3 text-left text-sm text-foreground ${press}`}
        >
          <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
            ★
          </span>
          <span>
            Pressable card
            <span className="block text-xs text-muted-foreground">
              the icon and text shrink with it
            </span>
          </span>
        </button>

        <button
          type="button"
          aria-label="Star"
          onPointerDown={() => record('Icon button')}
          className={`grid size-11 place-items-center rounded-md border border-border bg-muted text-foreground ${press}`}
        >
          ★
        </button>

        <div className="space-y-1 text-xs text-success">
          {log.length === 0 ? (
            <span className="text-muted-foreground">Press and hold each control above.</span>
          ) : (
            log.map((l, i) => <div key={i}>{l}</div>)
          )}
        </div>
      </div>
      <p className="text-xs text-success">
        <code>transform: scale(0.97)</code> on <code>:active</code> with{' '}
        <code>transition: transform 160ms ease-out</code>. Hold the pointer down and the control
        settles under your finger, then springs back on release —{' '}
        <code>scale()</code> takes the children with it, so the icon and label shrink too. Any
        pressable element earns this, not just buttons.
      </p>
    </div>
  );
}
