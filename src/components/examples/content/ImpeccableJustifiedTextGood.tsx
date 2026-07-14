const COPY =
  'Browsers justify a line by stretching the spaces between words until the line reaches both margins. On a narrow measure there are only a handful of gaps to absorb the slack, so each one grows enormously, and when the wide gaps happen to stack up, they carve a pale vertical channel down the paragraph.';

export function ImpeccableJustifiedTextGood() {
  return (
    <div className="space-y-3">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div>
          <p className="mb-1 text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            Default: left-aligned
          </p>
          <p lang="en" className="max-w-[26ch] text-left text-sm leading-[1.7] text-foreground">
            {COPY}
          </p>
        </div>

        <div className="border-t border-border pt-3">
          <p className="mb-1 text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            If you must justify: hyphens: auto
          </p>
          <p
            lang="en"
            className="max-w-[26ch] text-justify text-sm leading-[1.7] text-foreground [hyphens:auto]"
          >
            {COPY}
          </p>
        </div>
      </div>

      <p className="text-xs text-success">
        Left-aligned text keeps every word gap identical and lets the right edge stay ragged — no
        rivers, no compromise. If a design genuinely calls for a justified column, add{' '}
        <code className="rounded bg-muted px-1 font-mono">hyphens: auto</code> plus a{' '}
        <code className="rounded bg-muted px-1 font-mono">lang</code> attribute so the browser can
        break words at syllable boundaries and absorb the slack there instead of in the spaces.
      </p>
    </div>
  );
}
