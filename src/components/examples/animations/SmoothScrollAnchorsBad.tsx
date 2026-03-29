export function SmoothScrollAnchorsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-3 border-b border-border flex gap-2">
          <a href="#bad-section-1" className="text-xs text-primary underline">Section 1</a>
          <a href="#bad-section-2" className="text-xs text-primary underline">Section 2</a>
          <a href="#bad-section-3" className="text-xs text-primary underline">Section 3</a>
        </div>
        <div className="h-32 overflow-y-auto p-3 space-y-24">
          <div id="bad-section-1"><h4 className="text-sm font-medium text-foreground">Section 1</h4><p className="text-xs text-muted-foreground">Content for section one.</p></div>
          <div id="bad-section-2"><h4 className="text-sm font-medium text-foreground">Section 2</h4><p className="text-xs text-muted-foreground">Content for section two.</p></div>
          <div id="bad-section-3"><h4 className="text-sm font-medium text-foreground">Section 3</h4><p className="text-xs text-muted-foreground">Content for section three.</p></div>
        </div>
      </div>
      <p className="text-xs text-error">Anchor links jump instantly — disorienting</p>
    </div>
  );
}
