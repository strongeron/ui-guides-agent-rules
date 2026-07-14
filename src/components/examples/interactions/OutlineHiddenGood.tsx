export function OutlineHiddenGood() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <p className="text-xs text-muted-foreground">
          Tab into both buttons. Same markup —{' '}
          <code>focus-visible:outline-hidden</code> plus a replacement ring — rendered as your browser paints
          it, and as Windows forced-colors mode paints it.
        </p>

        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Your browser</p>
          <div className="border border-border rounded-md p-5 flex justify-center">
            {/* outline-hidden is v3's old outline-hidden: it hides the outline visually
                but keeps a transparent one for forced-colors to repaint. */}
            <button className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
              Save changes
            </button>
          </div>
          <p className="text-xs text-muted-foreground">The ring is there — identical to what you had in v3.</p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Forced colors / high contrast (simulated)
          </p>
          {/* The ring's box-shadow is still dropped by forced-colors — but the transparent
              outline survived, and the system repaints it in its own high-contrast color.
              Rendered here as a real outline in the panel's contrasting token. */}
          <div className="bg-foreground rounded-md p-5 flex justify-center">
            <button className="px-5 py-2 rounded-md bg-foreground text-background text-sm font-medium border border-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background">
              Save changes
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            The <code>box-shadow</code> ring is gone here too, but the outline <code>outline-hidden</code> kept
            is repainted by the system. The focused button is still unmistakable.
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        <code>outline-hidden</code> + a visible ring: sighted users get your ring, forced-colors users keep theirs
      </p>
    </div>
  );
}
