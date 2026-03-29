export function TapHighlightReplacementGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <style>{`
          .no-tap-good {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
          .no-tap-good:active {
            background: var(--muted);
          }
        `}</style>
        <button className="no-tap-good w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground transition-colors">
          Edit Profile
        </button>
        <button className="no-tap-good w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground transition-colors">
          Manage Team
        </button>
      </div>
      <p className="text-xs text-success">Tap highlight replaced with custom :active state</p>
    </div>
  );
}
