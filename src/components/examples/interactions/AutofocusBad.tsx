export function AutofocusBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Mobile Search Page</h3>
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-3">
          <code className="text-xs text-error-foreground font-mono">
            {'<input autoFocus />'}
          </code>
        </div>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">📱 On mobile:</p>
          <p className="text-xs text-muted-foreground">
            Autofocus opens the keyboard immediately, causing layout shift and potentially hiding important content above the input.
          </p>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        Autofocus on mobile causes keyboard layout shift
      </p>
    </div>
  );
}
