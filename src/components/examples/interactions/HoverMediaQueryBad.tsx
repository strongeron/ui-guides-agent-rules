export function HoverMediaQueryBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <style>{`
          .hover-bad-btn:hover {
            background: var(--primary);
            color: var(--primary-foreground);
          }
        `}</style>
        <button className="hover-bad-btn w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground transition-colors">
          Upload File
        </button>
        <button className="hover-bad-btn w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground transition-colors">
          Share Link
        </button>
        <button className="hover-bad-btn w-full px-4 py-2 border border-border rounded-lg text-sm text-foreground transition-colors">
          Download
        </button>
      </div>
      <p className="text-xs text-error">Hover state flashes on touch tap — confusing on mobile</p>
    </div>
  );
}
