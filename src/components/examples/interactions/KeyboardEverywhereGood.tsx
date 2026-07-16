export function KeyboardEverywhereGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Menu</h3>
        <div className="space-y-2" role="menu">
          <button
            onClick={() => alert('Edit clicked')}
            className="w-full text-left px-3 py-2 bg-card rounded border border-border shadow-sm transition-transform-shadow hover:shadow-md hover:-translate-y-px focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            Edit
          </button>
          <button
            onClick={() => alert('Delete clicked')}
            className="w-full text-left px-3 py-2 bg-card rounded border border-border shadow-sm transition-transform-shadow hover:shadow-md hover:-translate-y-px focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            Delete
          </button>
          <button
            onClick={() => alert('Share clicked')}
            className="w-full text-left px-3 py-2 bg-card rounded border border-border shadow-sm transition-transform-shadow hover:shadow-md hover:-translate-y-px focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            role="menuitem"
          >
            Share
          </button>
        </div>
      </div>
      <p className="text-xs text-success">
        Proper button elements with keyboard support and focus rings
      </p>
    </div>
  );
}
