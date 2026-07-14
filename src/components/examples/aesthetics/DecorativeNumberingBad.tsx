const features = [
  { n: '01', title: 'Analytics', body: 'Track every event, funnel, and cohort.' },
  { n: '02', title: 'Collaboration', body: 'Comment, assign, and resolve in place.' },
  { n: '03', title: 'Security', body: 'SSO, audit logs, and scoped API keys.' },
];

export function DecorativeNumberingBad() {
  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-foreground mb-3">Features</h3>

      {/* Three unrelated capabilities, stamped as if they were steps */}
      <div className="grid grid-cols-3 gap-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-md border border-border bg-card p-3">
            <span className="block text-lg font-semibold tabular-nums text-muted-foreground">
              {f.n}
            </span>
            <p className="text-sm font-medium text-foreground mt-1">{f.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{f.body}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-error mt-4">
        Reorder them &mdash; Security 01, Analytics 03 &mdash; and nothing breaks. Nothing follows
        from anything. The numerals are decoration wearing the costume of structure, and they lie to
        the reader, who reads &ldquo;01&rdquo; as a promise that something comes next.
      </p>
    </div>
  );
}
