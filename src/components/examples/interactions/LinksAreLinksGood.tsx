export function LinksAreLinksGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">Your Projects</h3>
        <a
          href="#dashboard"
          className="text-blue-600 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          View Dashboard
        </a>
      </div>
      <p className="text-xs text-success">
        Right-click or Cmd+click works - standard link behavior
      </p>
    </div>
  );
}
