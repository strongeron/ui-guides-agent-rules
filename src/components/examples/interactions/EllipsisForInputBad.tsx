export function EllipsisForInputBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2 bg-muted rounded-lg p-4">
        <button className="w-full text-left px-3 py-2 bg-card rounded hover:bg-muted text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Open
        </button>
        <button className="w-full text-left px-3 py-2 bg-card rounded hover:bg-muted text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Save
        </button>
        <button className="w-full text-left px-3 py-2 bg-card rounded hover:bg-muted text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Rename
        </button>
        <button className="w-full text-left px-3 py-2 bg-card rounded hover:bg-muted text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Delete
        </button>
      </div>
      <p className="text-xs text-error mt-4">
        No indication which actions require further input
      </p>
    </div>
  );
}
