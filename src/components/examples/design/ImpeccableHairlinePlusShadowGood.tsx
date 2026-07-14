/**
 * Good: two cards, each committed to ONE device. Left — a crisp hairline and no
 * shadow: flat, precise, in-plane. Right — a soft shadow and no border: lifted,
 * tactile, edge softened by the light it implies. Either is a decision; together
 * on one element they are a hedge.
 *
 * The plate is pinned light on purpose: a soft shadow only reads on a light surface.
 */
export function ImpeccableHairlinePlusShadowGood() {
  return (
    <div className="w-full space-y-3">
      <p className="text-xs text-muted-foreground">Two cards, one treatment each</p>

      <div className="grid grid-cols-2 gap-4 rounded-xl bg-neutral-100 p-6">
        {/* Committed to the EDGE: hairline, no shadow */}
        <div className="rounded-lg border border-neutral-300 bg-white p-4">
          <p className="text-sm font-semibold text-neutral-900">Defined edge</p>
          <p className="mt-1 text-xs text-neutral-500">
            Hairline only. Sits in the plane, and says so.
          </p>
        </div>

        {/* Committed to the LIFT: soft shadow, no border */}
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <p className="text-sm font-semibold text-neutral-900">Soft elevation</p>
          <p className="mt-1 text-xs text-neutral-500">
            Shadow only. Floats above the plane, and says so.
          </p>
        </div>
      </div>

      <div className="space-y-1 rounded bg-muted p-2 font-mono text-xs">
        <code className="block">border border-neutral-300 &mdash; no shadow</code>
        <code className="block">shadow-lg &mdash; no border</code>
      </div>

      <p className="text-xs text-success">
        Each card makes one claim and backs it. Note the exception that is NOT this anti-pattern:
        a single layered shadow that carries its own 0-blur ring (<code className="font-mono">0 0 0 1px</code>{' '}
        plus two soft depths) is one shadow, not a border plus a shadow &mdash; the ring is part of the
        lighting model rather than a second, competing device.
      </p>
    </div>
  );
}
