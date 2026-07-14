const features = [
  { title: 'Lightning Fast', body: 'Cold start to first byte in 40ms on the edge network.' },
  { title: 'Enterprise Ready', body: 'SOC 2 Type II, with role-based access down to the row.' },
  { title: 'Fully Extensible', body: 'A typed SDK, so your own tools are first-class.' },
];

function InlineGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-4 h-4 shrink-0 text-muted-foreground"
      aria-hidden="true"
    >
      <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTileStackGood() {
  return (
    <div className="w-full">
      <ul className="divide-y divide-border border-y border-border">
        {features.map((f) => (
          <li key={f.title} className="py-4">
            {/* Icon sits inline, inside the heading line — no container, no tile, no stack */}
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <InlineGlyph />
              {f.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1 pl-6 max-w-prose">
              {f.body}
            </p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-success mt-4">
        Same three features, left-aligned. The icon is inline inside the heading, so there is no
        square, background-filled sibling above it — nothing for the detector to match, and the
        text now reads down a single edge instead of across three centered boxes.
      </p>
    </div>
  );
}
