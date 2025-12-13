export function ScrollPersistenceBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <code className="text-xs text-red-800 font-mono block">
            {`// SPA without scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
// But no custom scroll handling...`}
          </code>
        </div>
        <p className="text-sm text-gray-600">
          User scrolls down a long list, clicks an item, then presses Back. They're returned to the top instead of their previous scroll position.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Scroll position lost on Back/Forward navigation
      </p>
    </div>
  );
}
