import type { CSSProperties } from 'react';

/**
 * Good: TWO values per semantic role — one for each surface. Same hue angle, so the
 * green is still that green; chroma pulled down and lightness nudged up for dark, so
 * the badge sits still instead of buzzing. Optically matched, not literally identical.
 *
 * Literals are deliberately confined to these four OKLCH values — the offending color
 * IS the subject of this principle. Only chroma and lightness move; hue never does.
 */
const SUCCESS_HUE = 149;
const ERROR_HUE = 25;

const onLight = {
  '--status-success': `oklch(0.72 0.19 ${SUCCESS_HUE})`,
  '--status-error': `oklch(0.64 0.21 ${ERROR_HUE})`,
} as CSSProperties;

// Same hue. Chroma down (0.19 → 0.11, 0.21 → 0.13), lightness up to stay legible.
const onDark = {
  '--status-success': `oklch(0.78 0.11 ${SUCCESS_HUE})`,
  '--status-error': `oklch(0.71 0.13 ${ERROR_HUE})`,
} as CSSProperties;

function Badges({ ink }: { ink: string }) {
  return (
    <div className="flex gap-2">
      <span className={`rounded-md px-2 py-1 text-xs font-semibold ${ink}`} style={{ backgroundColor: 'var(--status-success)' }}>
        Deployed
      </span>
      <span className={`rounded-md px-2 py-1 text-xs font-semibold ${ink}`} style={{ backgroundColor: 'var(--status-error)' }}>
        Failed
      </span>
    </div>
  );
}

export function InterfaceDesaturateOnDarkGood() {
  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-muted-foreground">One hue per role, a value per surface</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-lg bg-white p-4" style={onLight}>
          <p className="text-xs font-medium text-neutral-500">Light surface</p>
          <Badges ink="text-white" />
        </div>

        <div className="space-y-2 rounded-lg bg-neutral-950 p-4" style={onDark}>
          <p className="text-xs font-medium text-neutral-300">Dark surface</p>
          {/* The desaturated, lighter fills want dark ink on top */}
          <Badges ink="text-neutral-950" />
        </div>
      </div>

      <div className="space-y-1 rounded bg-muted p-2 font-mono text-xs">
        <code className="block">light: oklch(0.72 0.19 149) &middot; oklch(0.64 0.21 25)</code>
        <code className="block">dark: &nbsp;oklch(0.78 0.11 149) &middot; oklch(0.71 0.13 25)</code>
      </div>

      <p className="text-xs text-success">
        Hue is held constant, so nobody would call these different colors; chroma is the only thing
        that moves, and the dark badges stop vibrating. Note this runs OPPOSITE to
        <code className="mx-1 font-mono">design-impeccable-tinted-neutrals</code>, which ADDS a trace of
        chroma to neutrals so they belong to the brand. Here we TAKE chroma away from an already-saturated
        semantic color so it survives a dark surface. A palette should do both.
      </p>
    </div>
  );
}
