export function DarkPreferencesGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inline Theme Script</h4>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`<head>
  <script>
    const theme = localStorage.theme;
    const prefersDark = matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (theme === 'dark' ||
        (!theme && prefersDark)) {
      document.documentElement
        .classList.add('dark');
    }
  </script>
</head>`}</pre>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 p-3 bg-background border border-border rounded-lg text-center text-sm">
          <div className="font-medium">Page Load</div>
          <div className="text-xs text-success">Correct theme instantly</div>
        </div>
        <div className="text-muted-foreground">=</div>
        <div className="flex-1 p-3 bg-background border border-border rounded-lg text-center text-sm">
          <div className="font-medium">No Flash</div>
          <div className="text-xs text-success">Smooth experience</div>
        </div>
      </div>
      <p className="text-xs text-success">
        Script runs before first paint, preventing theme flash
      </p>
    </div>
  );
}
