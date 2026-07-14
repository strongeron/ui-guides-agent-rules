import { useState } from 'react';

export function PressFeedbackScaleBad() {
  const [log, setLog] = useState<string[]>([]);
  const record = (what: string) =>
    setLog((prev) => [`${what} — pointerdown fired, nothing moved`, ...prev].slice(0, 3));

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        {/* No transform at all: the only state change is hover, which touch users never see. */}
        <button
          type="button"
          onPointerDown={() => record('Primary button')}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90"
        >
          Save changes
        </button>

        <button
          type="button"
          onPointerDown={() => record('Card')}
          className="flex w-full items-center gap-2 rounded-md border border-border bg-muted p-3 text-left text-sm text-foreground"
        >
          <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
            ★
          </span>
          <span>
            Pressable card
            <span className="block text-xs text-muted-foreground">no press feedback either</span>
          </span>
        </button>

        {/* Overdone: 0.85 reads as broken, not responsive. */}
        <button
          type="button"
          onPointerDown={() => record('Overdone button')}
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground transition-transform duration-500 ease-in-out active:scale-[0.85]"
        >
          Overdone: scale(0.85), 500ms
        </button>

        <div className="space-y-1 text-xs text-error">
          {log.length === 0 ? (
            <span className="text-muted-foreground">Press and hold each control above.</span>
          ) : (
            log.map((l, i) => <div key={i}>{l}</div>)
          )}
        </div>
      </div>
      <p className="text-xs text-error">
        Hold the mouse down on the first two: the event fires, but the pixels never acknowledge it,
        so a slow network reads as a dead button and you click again. The third overcorrects —
        <code>scale(0.85)</code> over 500ms collapses the control and feels broken rather than
        responsive.
      </p>
    </div>
  );
}
