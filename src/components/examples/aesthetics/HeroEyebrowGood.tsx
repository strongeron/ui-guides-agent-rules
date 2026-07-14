const sections = [
  { title: 'Features', body: 'Branch previews, typed pipelines, and rollbacks that take one click.' },
  { title: 'Pricing', body: 'Free while you are under ten thousand runs a month.' },
  { title: 'Testimonials', body: 'Teams at Linear and Vercel run their release trains on it.' },
];

export function HeroEyebrowGood() {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card">
        {/* Beta lives where status belongs: in the nav, next to the product name */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Relay</span>
          <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            Beta
          </span>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-tight">
            Build faster
          </h1>
          {/* The beta fact is folded into the subhead as a sentence, not staged as a chip */}
          <p className="text-sm text-muted-foreground mt-3 max-w-prose">
            The workflow platform for modern teams. It is in beta, so pricing is still free and the
            API can still move under you.
          </p>

          {/* Sections separate on structure: a rule and a real heading. No kickers. */}
          {sections.map((s) => (
            <section key={s.title} className="mt-6 pt-5 border-t border-border">
              <h2 className="text-base font-semibold text-foreground">{s.title}</h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-prose">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Zero eyebrows. Status is a real nav-level badge, the beta caveat is a sentence in the
        subhead, and sections are told apart by rules and headings — so nothing sits above a
        heading in tracked caps.
      </p>
    </div>
  );
}
