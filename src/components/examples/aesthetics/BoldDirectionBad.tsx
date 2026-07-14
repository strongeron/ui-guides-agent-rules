export function BoldDirectionBad() {
  return (
    <div className="w-full max-w-md">
      <div className="p-6 rounded-2xl border border-border bg-card">
        {/* An editorial serif kicker... */}
        <p
          className="text-xs italic text-muted-foreground mb-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          A publication for builders
        </p>

        {/* ...over a soft, rounded product card... */}
        <div className="rounded-xl bg-muted p-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Everything, gently</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Friendly, capable, and above all approachable.
          </p>
        </div>

        {/* ...next to a hard-edged mono button, because why not both. */}
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 text-sm font-medium bg-foreground text-background"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            ENTER
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-full border border-border text-muted-foreground">
            Maybe later
          </button>
        </div>
      </div>

      <p className="text-xs text-error mt-4">
        Editorial serif, soft rounded SaaS, and brutalist mono &mdash; three borrowed idioms, none
        committed to. Nothing can be blamed on a choice, because no choice was made, and there is
        nothing to remember. (The specific slop inventory &mdash; purple, gradients, glass, glow
        &mdash; is detected by <code>design-ibelick-no-purple</code>,{' '}
        <code>design-ibelick-no-gradients</code>, <code>design-impeccable-no-glassmorphism</code> and{' '}
        <code>design-impeccable-dark-glow</code>.)
      </p>
    </div>
  );
}
