export function TapHighlightReplacementBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <style>{`
          .no-tap-bad {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
        `}</style>
        <button className="no-tap-bad w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground">
          Edit Profile
        </button>
        <button className="no-tap-bad w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground">
          Manage Team
        </button>
      </div>
      <p className="text-xs text-error">Tap highlight removed with no replacement — no touch feedback</p>
    </div>
  );
}
