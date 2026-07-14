const PARAGRAPHS = [
  'Preview deployments are instant — every push gets its own URL — and the URL never changes.',
  'Your team reviews the branch — not a screenshot — so feedback lands on the real thing.',
  'Rollback is one click — no rebuild, no waiting — because the old output is still on disk.',
  'Pricing is usage-based — you pay for what you serve — and the free tier covers side projects.',
  'It is the same runtime locally and in production -- no drift, no surprises.',
];

const DASH_PATTERN = /—|--/g;
const dashCount = PARAGRAPHS.join(' ').match(DASH_PATTERN)?.length ?? 0;

function Highlighted({ text }: { text: string }) {
  const parts = text.split(DASH_PATTERN);
  const dashes = text.match(DASH_PATTERN) ?? [];
  return (
    <p className="text-sm leading-[1.6] text-foreground">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < dashes.length && (
            <mark className="rounded bg-error/15 px-1 font-semibold text-error">{dashes[i]}</mark>
          )}
        </span>
      ))}
    </p>
  );
}

export function ImpeccableEmDashOveruseBad() {
  return (
    <div className="space-y-3">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4">
        {PARAGRAPHS.map((p) => (
          <Highlighted key={p} text={p} />
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          {dashCount} em-dashes in body copy
        </span>
        <span className="text-muted-foreground">detector fires at 5 or more</span>
      </div>

      <p className="text-xs text-error">
        Every sentence pivots on the same interruption, including the ASCII{' '}
        <code className="rounded bg-muted px-1 font-mono">--</code> the detector also counts. impeccable
        bans the em dash outright, but the detector is deliberately lenient and only fires at 5+,
        because it is the repeated cadence that reads as machine-written, not any single dash.
      </p>
    </div>
  );
}
