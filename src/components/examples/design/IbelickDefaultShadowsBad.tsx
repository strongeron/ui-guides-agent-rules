const cards = [
  { name: 'Card A', note: 'custom', shadow: '0 2px 14px rgba(0,0,0,0.28)' },
  { name: 'Card B', note: 'custom', shadow: '3px 3px 0 rgba(0,0,0,0.22)' },
  { name: 'Card C', note: 'custom', shadow: '0 12px 4px -6px rgba(0,0,0,0.35)' },
];

export function IbelickDefaultShadowsBad() {
  return (
    <div className="space-y-4">
      {/* Light plate: shadows are unreadable against the dark theme. */}
      <div className="rounded-xl bg-neutral-100 p-6">
        <div className="grid grid-cols-3 gap-4">
          {cards.map((c) => (
            <div key={c.name} className="rounded-lg bg-white p-3" style={{ boxShadow: c.shadow }}>
              <p className="text-sm font-medium text-neutral-900">{c.name}</p>
              <p className="text-xs text-neutral-500">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-destructive">
        Three hand-rolled shadows with different blur, offset and direction. Nothing tells you which card sits above
        which
      </p>
    </div>
  );
}
