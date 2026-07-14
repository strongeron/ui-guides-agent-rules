export function OutlineHiddenBad() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <p className="text-xs text-muted-foreground">
          Tab into both buttons. Same markup —{' '}
          <code>focus:outline-none</code> plus a custom ring — rendered as your browser paints it, and as
          Windows forced-colors mode paints it.
        </p>

        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Your browser</p>
          <div className="border border-border rounded-md p-5 flex justify-center">
            {/* In v4, outline-none now sets a REAL outline-style: none. */}
            <button className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring">
              Save changes
            </button>
          </div>
          <p className="text-xs text-muted-foreground">The ring is there. Nothing looks wrong.</p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Forced colors / high contrast (simulated)
          </p>
          {/* Forced-colors overrides author colors and drops box-shadow — so the ring is gone.
              outline-none removed the transparent outline that used to be repainted here.
              This button therefore has NO focus indicator left: it renders exactly that. */}
          <div className="bg-foreground rounded-md p-5 flex justify-center">
            <button className="px-5 py-2 rounded-md bg-foreground text-background text-sm font-medium border border-background focus:outline-none">
              Save changes
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            The system stripped the <code>box-shadow</code> ring, and <code>outline-none</code> deleted the
            outline it would have repainted. Focus is on the button — and completely invisible.
          </p>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        <code>outline-none</code> in v4 kills the forced-colors focus indicator — a silent a11y regression on upgrade
      </p>
    </div>
  );
}
