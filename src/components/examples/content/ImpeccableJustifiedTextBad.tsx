const COPY =
  'Browsers justify a line by stretching the spaces between words until the line reaches both margins. On a narrow measure there are only a handful of gaps to absorb the slack, so each one grows enormously, and when the wide gaps happen to stack up, they carve a pale vertical channel down the paragraph.';

export function ImpeccableJustifiedTextBad() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-card p-4">
        <p
          lang="en"
          className="max-w-[26ch] text-justify text-sm leading-[1.7] text-foreground [hyphens:none]"
        >
          {COPY}
        </p>
      </div>

      <p className="text-xs text-error">
        <code className="rounded bg-muted px-1 font-mono">text-align: justify</code> with{' '}
        <code className="rounded bg-muted px-1 font-mono">hyphens: none</code> — the exact
        combination the detector flags. Squint at the paragraph: the stretched word gaps line up
        into “rivers of white” running through it. Nothing here is broken in code, but the text is
        measurably slower to read.
      </p>
    </div>
  );
}
