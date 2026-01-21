export function IbelickIconButtonsGood() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          aria-label="Open menu"
          className="p-2 rounded-lg bg-muted hover:bg-muted/80"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          aria-label="Search"
          className="p-2 rounded-lg bg-muted hover:bg-muted/80"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button
          aria-label="Close dialog"
          className="p-2 rounded-lg bg-muted hover:bg-muted/80"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-success">
        aria-label announces "Open menu", "Search", "Close dialog" button
      </p>
    </div>
  );
}
