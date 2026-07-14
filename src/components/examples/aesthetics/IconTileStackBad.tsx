const features = [
  { title: 'Lightning Fast', body: 'Ship in seconds with our optimized edge network.' },
  { title: 'Enterprise Ready', body: 'SOC 2 compliant with role-based access control.' },
  { title: 'Fully Extensible', body: 'Plug in your own tools with a typed SDK.' },
];

function TileGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6" aria-hidden="true">
      <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTileStackBad() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-5 text-center">
            {/* The tell: a 48px rounded-square tinted icon tile, stacked directly above the heading */}
            <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300 flex items-center justify-center mx-auto mb-4">
              <TileGlyph />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-error mt-4">
        Three identical 48px rounded-xl tinted tiles, each stacked above an h3 — a square,
        background-filled, previous-sibling-of-a-heading box with radius under half its width.
        This is the detector's exact signature, and every generator emits it.
      </p>
    </div>
  );
}
