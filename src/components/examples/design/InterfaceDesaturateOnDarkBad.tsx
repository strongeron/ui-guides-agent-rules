import type { CSSProperties } from 'react';

/**
 * Bad: ONE token per semantic role, reused on both surfaces. The success and error
 * swatches were picked against white, where high chroma is what makes them visible.
 * Dropped onto near-black they keep every bit of that chroma, and the badges buzz.
 *
 * Literals are deliberately confined to these two OKLCH values — the offending color
 * IS the subject of this principle.
 */
const ONE_TOKEN_PER_ROLE = {
  // The classic saturated pair, tuned for a white page and never re-tuned.
  '--status-success': 'oklch(0.72 0.19 149)',
  '--status-error': 'oklch(0.64 0.21 25)',
} as CSSProperties;

function Badges() {
  return (
    <div className="flex gap-2">
      <span className="rounded-md px-2 py-1 text-xs font-semibold text-white" style={{ backgroundColor: 'var(--status-success)' }}>
        Deployed
      </span>
      <span className="rounded-md px-2 py-1 text-xs font-semibold text-white" style={{ backgroundColor: 'var(--status-error)' }}>
        Failed
      </span>
    </div>
  );
}

export function InterfaceDesaturateOnDarkBad() {
  return (
    <div className="w-full space-y-3" style={ONE_TOKEN_PER_ROLE}>
      <p className="text-xs text-muted-foreground">Same two tokens on both surfaces</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-lg bg-white p-4">
          <p className="text-xs font-medium text-neutral-500">Light surface</p>
          <Badges />
        </div>

        <div className="space-y-2 rounded-lg bg-neutral-950 p-4">
          <p className="text-xs font-medium text-neutral-300">Dark surface</p>
          <Badges />
        </div>
      </div>

      <div className="rounded bg-muted p-2 font-mono text-xs">
        <code className="text-error">--status-success / --status-error: one value, both themes</code>
      </div>

      <p className="text-xs text-error">
        On white the chroma is doing a job: it has a bright surface to fight. On near-black there is
        nothing left to fight, so the same chroma just vibrates &mdash; the glyph edges shimmer and the
        badge reads as loud rather than as information. This is not a contrast failure (the ratio can
        pass); it is a saturation failure, and no amount of adjusting lightness alone will fix it.
      </p>
    </div>
  );
}
