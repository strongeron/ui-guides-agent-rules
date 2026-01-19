export function SemanticColorsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
          Primary Action
        </button>
        <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg dark:bg-gray-700 dark:text-gray-200">
          Secondary Action
        </button>
        <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg">
          Destructive Action
        </button>
        <div className="p-3 bg-gray-100 text-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-gray-400">
          Muted content area
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-3">
        <h5 className="text-sm font-medium mb-2">Hardcoded Classes Used:</h5>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li><code className="bg-muted px-1 rounded text-error">bg-blue-600</code> - hardcoded</li>
          <li><code className="bg-muted px-1 rounded text-error">bg-red-600</code> - hardcoded</li>
          <li><code className="bg-muted px-1 rounded text-error">dark:bg-gray-800</code> - manual</li>
        </ul>
      </div>
      <p className="text-xs text-error">
        Hardcoded colors require manual dark mode variants everywhere
      </p>
    </div>
  );
}
