export function TouchActionGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex gap-2 mb-4">
          <button className="touch-manipulation px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Button 1
          </button>
          <button className="touch-manipulation px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Button 2
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          touch-action: manipulation removes the double-tap zoom delay. Taps register instantly on mobile.
        </p>
        <div className="mt-3 bg-success/10 border border-success/20 rounded-lg p-2">
          <code className="text-xs text-success-foreground font-mono">
            touch-action: manipulation
          </code>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Instant tap response with touch-action: manipulation
      </p>
    </div>
  );
}
