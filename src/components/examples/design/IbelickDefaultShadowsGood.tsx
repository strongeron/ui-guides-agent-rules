const cards = [
  { name: 'Card A', token: 'shadow-sm', cls: 'shadow-sm' },
  { name: 'Card B', token: 'shadow', cls: 'shadow' },
  { name: 'Card C', token: 'shadow-md', cls: 'shadow-md' },
];

export function IbelickDefaultShadowsGood() {
  return (
    <div className="space-y-4">
      {/* Same light plate as the Bad example, so the ramp is legible and the comparison fair. */}
      <div className="rounded-xl bg-neutral-100 p-6">
        <div className="grid grid-cols-3 gap-4">
          {cards.map((c) => (
            <div key={c.name} className={`rounded-lg bg-white p-3 ${c.cls}`}>
              <p className="text-sm font-medium text-neutral-900">{c.name}</p>
              <p className="text-xs text-neutral-500">{c.token}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-success">
        Tailwind's default scale, one light source, increasing depth. The elevation order is obvious at a glance
      </p>
    </div>
  );
}
