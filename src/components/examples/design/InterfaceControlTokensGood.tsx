import type { CSSProperties } from 'react';

/**
 * Good: controls get their own trio — `--control-bg`, `--control-border`,
 * `--control-focus` — declared independently of the surface tokens. Because they are
 * separable, the control boundary can be raised to clear the 3:1 non-text-contrast
 * floor (WCAG 1.4.11) WITHOUT dragging every divider on the page up with it.
 *
 * The dark panel shows the move you cannot make while sharing a surface token: an
 * input that is slightly DARKER than its surroundings reads as an inset well.
 */
const lightControls = {
  '--surface': 'oklch(0.99 0.002 250)',
  '--ink': 'oklch(0.22 0.010 250)',
  '--divider': 'oklch(0.92 0.004 250)', // quiet: dividers should recede
  '--control-bg': 'oklch(1 0 0)',
  '--control-border': 'oklch(0.68 0.012 250)', // loud enough to clear 3:1 on the surface
  '--control-focus': 'oklch(0.55 0.190 259)',
} as CSSProperties;

const darkControls = {
  '--surface': 'oklch(0.24 0.006 250)',
  '--ink': 'oklch(0.95 0.005 250)',
  '--divider': 'oklch(0.34 0.008 250)',
  '--control-bg': 'oklch(0.18 0.006 250)', // DARKER than its surroundings: an inset well
  '--control-border': 'oklch(0.48 0.012 250)',
  '--control-focus': 'oklch(0.72 0.150 259)',
} as CSSProperties;

function Panel({ tokens, label }: { tokens: CSSProperties; label: string }) {
  const id = `control-tokens-${label.toLowerCase()}`;
  return (
    <form
      className="space-y-3 rounded-lg bg-[var(--surface)] p-4 text-[var(--ink)]"
      style={tokens}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-1">
        <label htmlFor={id} className="block text-xs font-medium">
          {label} &middot; project name
        </label>
        <input
          id={id}
          type="text"
          defaultValue="atlas-web"
          className="w-full rounded-md border border-[var(--control-border)] bg-[var(--control-bg)] px-3 py-2 text-sm text-[var(--ink)] outline-[var(--control-focus)] focus-visible:outline-2 focus-visible:outline-offset-1"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" defaultChecked className="size-4 accent-[var(--control-focus)]" />
        Deploy on push
      </label>

      {/* The divider keeps its own quiet token — untouched by the control boundary */}
      <hr className="border-[var(--divider)]" />
    </form>
  );
}

export function InterfaceControlTokensGood() {
  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-muted-foreground">Controls tuned independently of surfaces</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Panel tokens={lightControls} label="Light" />
        <Panel tokens={darkControls} label="Dark" />
      </div>

      <div className="space-y-1 rounded bg-muted p-2 font-mono text-xs">
        <code className="block">--control-bg / --control-border / --control-focus</code>
        <code className="block">--divider stays quiet &mdash; a different token entirely</code>
      </div>

      <p className="text-xs text-success">
        Tab into a field: focus is drawn from <code className="font-mono">--control-focus</code>, not
        borrowed from a surface. The control border is loud enough to clear the 3:1 boundary floor of
        <code className="mx-1 font-mono">design-non-text-contrast</code> while the divider stays a whisper,
        which is only possible because they are separate tokens. And on dark, the input is DARKER than
        its panel &mdash; an inset well that says &ldquo;type here&rdquo; without heavy chrome.
      </p>
    </div>
  );
}
