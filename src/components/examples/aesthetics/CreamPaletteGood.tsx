export function CreamPaletteGood() {
  return (
    <div className="w-full">
      {/* Surface is derived from the brand hue: same hue angle (264), chroma dropped to ~0.01 */}
      <div className="rounded-lg border border-border bg-[oklch(0.97_0.012_264)] dark:bg-[oklch(0.23_0.014_264)] p-6">
        <p className="text-[11px] font-medium text-[oklch(0.55_0.18_264)] dark:text-[oklch(0.75_0.13_264)] mb-4">
          Ledger — accounting
        </p>
        <h1 className="text-2xl leading-tight font-semibold tracking-tight text-[oklch(0.26_0.03_264)] dark:text-[oklch(0.95_0.01_264)]">
          Books that balance themselves.
        </h1>
        <p className="text-sm mt-3 max-w-prose text-[oklch(0.48_0.03_264)] dark:text-[oklch(0.72_0.02_264)]">
          The page is not neutral and it is not cream. It is the brand, turned all the way down.
        </p>
      </div>

      {/* Show the derivation, so the surface is auditable rather than vibes */}
      <div className="mt-3 rounded-md border border-border bg-card p-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 rounded border border-border bg-[oklch(0.55_0.18_264)]" />
          <span className="text-muted-foreground text-xs">→ hold hue, cut chroma →</span>
          <div className="h-8 w-8 shrink-0 rounded border border-border bg-[oklch(0.97_0.012_264)]" />
        </div>
        <p className="font-mono text-[11px] text-muted-foreground mt-2">
          brand oklch(0.55 0.18 264) → surface oklch(0.97 0.012 264)
        </p>
      </div>

      <p className="text-xs text-success mt-4">
        A tinted neutral at chroma 0.01, derived from the brand hue rather than reached for. It
        fails the cream test (channels are not r &ge; g &ge; b, warmth is negative), and you could not
        have guessed it from the word &ldquo;accounting&rdquo;.
      </p>
    </div>
  );
}
