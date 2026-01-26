export function DarkPreferencesBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Deferred Theme Check</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`// In React useEffect (too late!)
useEffect(() => {
  const prefersDark = matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  if (prefersDark) {
    document.documentElement
      .classList.add('dark');
  }
}, []);`}</pre>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 p-3 bg-[var(--ex-dark-pref-light-bg)] border border-[var(--ex-dark-pref-light-border)] rounded-lg text-center text-sm text-[var(--ex-dark-pref-light-text)]">
          <div className="font-medium">Initial</div>
          <div className="text-xs text-[var(--ex-dark-pref-light-subtext)]">Light theme</div>
        </div>
        <div className="text-muted-foreground animate-pulse">...</div>
        <div className="flex-1 p-3 bg-[var(--ex-dark-pref-dark-bg)] border border-[var(--ex-dark-pref-dark-border)] rounded-lg text-center text-sm text-[var(--ex-dark-pref-dark-text)]">
          <div className="font-medium">After JS</div>
          <div className="text-xs text-[var(--ex-dark-pref-dark-subtext)]">Dark theme</div>
        </div>
      </div>
      <p className="text-xs text-error">
        Theme applied after render causes jarring flash (FART)
      </p>
    </div>
  );
}
