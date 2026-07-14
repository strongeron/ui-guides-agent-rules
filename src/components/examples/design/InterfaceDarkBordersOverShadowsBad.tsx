/**
 * Bad: elevation expressed purely as a drop shadow on a dark surface. `shadow-lg`
 * paints a dark blur onto an already near-black background — the shadow is in the
 * CSS and in the computed style, and it is invisible on screen. The cards read as
 * one flat slab because their fill matches the panel behind them.
 */
const CARDS = [
  { title: 'Requests', value: '182k' },
  { title: 'Errors', value: '0.03%' },
  { title: 'p95', value: '128 ms' },
];

export function InterfaceDarkBordersOverShadowsBad() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Dark panel &middot; elevation = shadow-lg, no border</p>

      <div className="rounded-lg bg-zinc-950 p-4">
        <div className="grid grid-cols-3 gap-3">
          {CARDS.map((card) => (
            /* Same fill as the panel + a shadow that has nothing lighter to fall on */
            <div key={card.title} className="rounded-lg bg-zinc-950 p-3 shadow-lg">
              <p className="text-xs text-zinc-400">{card.title}</p>
              <p className="mt-1 text-lg font-semibold text-zinc-100">{card.value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-error">
        A shadow is dark pixels. On a dark background there is almost no luminance left to darken,
        so the card edges vanish and the three tiles dissolve into the panel. You cannot see where
        one card ends and the next begins &mdash; the elevation exists only in the stylesheet.
      </p>
    </div>
  );
}
