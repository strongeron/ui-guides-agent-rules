export function FocusRingShadowGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-xs text-muted-foreground mb-6">
          Tab into the pill. The ring is a <code>box-shadow</code> (Tailwind&apos;s <code>ring</code>), which is
          clipped to the element&apos;s own radius in every browser.
        </p>

        <div className="flex justify-center py-6">
          <button
            // ring-* compiles to box-shadow, so the ring inherits rounded-full.
            // ring-offset-background paints the gap so the ring reads on any surface.
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Rounded button
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          The ring hugs the pill exactly, and the offset gap is rounded too — no browser-version caveats.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        <code>box-shadow</code> rings always respect <code>border-radius</code> — same ring everywhere
      </p>
    </div>
  );
}
