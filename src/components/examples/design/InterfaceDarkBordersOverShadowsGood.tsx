/**
 * Good: on dark, definition comes from a hairline border plus one step of surface
 * lightness. No shadow at all. Each card is unmistakably a separate object, and the
 * effect survives a bright room and a cheap panel, which a drop shadow does not.
 */
const CARDS = [
  { title: 'Requests', value: '182k' },
  { title: 'Errors', value: '0.03%' },
  { title: 'p95', value: '128 ms' },
];

export function InterfaceDarkBordersOverShadowsGood() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Dark panel &middot; elevation = hairline border + one surface step
      </p>

      <div className="rounded-lg bg-zinc-950 p-4">
        <div className="grid grid-cols-3 gap-3">
          {CARDS.map((card) => (
            /* One lightness step up from the panel, defined by a 1px border */
            <div
              key={card.title}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
            >
              <p className="text-xs text-zinc-400">{card.title}</p>
              <p className="mt-1 text-lg font-semibold text-zinc-100">{card.value}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-success">
        The border does the work the shadow could not: a crisp edge that is legible at any ambient
        brightness, at zero blur cost. The single lightness step (panel &rarr; card) supplies the
        depth, so the tiles are clearly above the panel without a pixel of shadow.
      </p>
    </div>
  );
}
