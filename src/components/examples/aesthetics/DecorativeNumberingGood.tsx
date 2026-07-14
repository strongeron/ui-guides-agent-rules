const features = [
  { title: 'Analytics', body: 'Track every event, funnel, and cohort.' },
  { title: 'Collaboration', body: 'Comment, assign, and resolve in place.' },
  { title: 'Security', body: 'SSO, audit logs, and scoped API keys.' },
];

const steps = [
  { title: 'Push', body: 'A commit lands on main.' },
  { title: 'Build', body: 'The commit is compiled and tested.' },
  { title: 'Promote', body: 'The passing build becomes production.' },
];

export function DecorativeNumberingGood() {
  return (
    <div className="w-full space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3">Features</h3>
        {/* An unordered set, so it is marked up and rendered as one: no numerals */}
        <ul className="grid grid-cols-3 gap-3">
          {features.map((f) => (
            <li key={f.title} className="rounded-md border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3">How deploys work</h3>
        {/* A real sequence: the order IS the information, so it earns its numbers */}
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-baseline gap-3">
              <span className="text-sm font-semibold tabular-nums text-primary shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="text-sm font-medium text-foreground">{s.title}</span>
                <span className="text-xs text-muted-foreground"> &mdash; {s.body}</span>
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="text-muted-foreground text-xs">
                  &darr;
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <p className="text-xs text-success">
        The features lost their numerals and lost nothing else. The deploy flow keeps them, because
        Build cannot precede Push &mdash; the order carries information the reader needs, and the
        markup (<code>&lt;ol&gt;</code> vs <code>&lt;ul&gt;</code>) says so too.
      </p>
    </div>
  );
}
