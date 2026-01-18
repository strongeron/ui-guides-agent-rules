export function ScrollPersistenceGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
          <code className="text-xs text-success-foreground font-mono block whitespace-pre">
{`// Let browser handle it (default)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'auto';
}

// Or manually save/restore for SPAs
sessionStorage.setItem(
  'scroll-' + location.pathname,
  String(window.scrollY)
);`}
          </code>
        </div>
        <p className="text-sm text-muted-foreground">
          User scrolls, navigates, presses Back - returned to exact scroll position. Context is preserved.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Scroll position restored on Back/Forward navigation
      </p>
    </div>
  );
}
