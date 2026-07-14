const siblings = ['Ledger — accounting', 'Sprout — plant care', 'Vellum — legal AI'];

export function CreamPaletteBad() {
  return (
    <div className="w-full">
      {/* The cream IS the anti-pattern, so it is pinned to its literal value and stays light in both themes */}
      <div className="rounded-lg border border-border bg-[#faf7f0] p-6">
        <p className="text-[11px] font-medium text-stone-500 mb-4">Ledger — accounting</p>
        <h1
          className="text-2xl leading-tight text-stone-800"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Books that balance themselves.
        </h1>
        <p className="text-sm text-stone-600 mt-3 max-w-prose">
          Warm, calm, considered. Everyone says it looks tasteful.
        </p>
      </div>

      {/* Three unrelated products, three unrelated domains, the exact same surface */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        {siblings.map((s) => (
          <div key={s} className="rounded-md border border-border bg-[#faf7f0] p-3">
            <p className="text-[10px] text-stone-500 truncate">{s}</p>
            <div className="h-1.5 w-full rounded bg-stone-200 mt-2" />
            <div className="h-1.5 w-2/3 rounded bg-stone-200 mt-1" />
          </div>
        ))}
      </div>

      <p className="text-xs text-error mt-4">
        #faf7f0 passes the detector on every axis: min channel 240 (&ge;209), r &ge; g &ge; b, warmth
        r&minus;b = 16 (inside 6&ndash;48). It reads as taste, but accounting, plant care, and legal
        AI all landed on it — that is a training-data reflex, not a decision.
      </p>
    </div>
  );
}
