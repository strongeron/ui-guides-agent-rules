export function ScrollPersistenceGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <code className="text-xs text-green-800 font-mono block whitespace-pre">
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
        <p className="text-sm text-gray-600">
          User scrolls, navigates, presses Back - returned to exact scroll position. Context is preserved.
        </p>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Scroll position restored on Back/Forward navigation
      </p>
    </div>
  );
}
