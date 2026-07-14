const PARAGRAPHS = [
  'Preview deployments are instant: every push gets its own URL, and that URL never changes.',
  'Your team reviews the branch itself, not a screenshot, so feedback lands on the real thing.',
  'Rollback is one click. No rebuild, no waiting, because the old output is still on disk.',
  'Pricing is usage-based (you pay for what you serve), and the free tier covers side projects.',
  'It is the same runtime locally and in production, so nothing drifts.',
];

const DASH_PATTERN = /—|--/g;
const dashCount = PARAGRAPHS.join(' ').match(DASH_PATTERN)?.length ?? 0;

export function ImpeccableEmDashOveruseGood() {
  return (
    <div className="space-y-3">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4">
        {PARAGRAPHS.map((p) => (
          <p key={p} className="text-sm leading-[1.6] text-foreground">
            {p}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          {dashCount} em-dashes in body copy
        </span>
        <span className="text-muted-foreground">clean</span>
      </div>

      <p className="text-xs text-success">
        Same five claims, same length, punctuated with the marks that actually carry the meaning: a
        colon to introduce, commas to nest an aside, a period to stop, parentheses to whisper. The
        rhythm now varies from sentence to sentence, which is the part a reader registers as human.
      </p>
    </div>
  );
}
