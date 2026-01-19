export function SkipLinkTwBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">No Skip Link</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Keyboard users must tab through all nav items.
        </p>
        <div className="relative bg-muted rounded-lg p-4 min-h-[120px]">
          <nav className="flex gap-2 mb-4">
            <button className="px-2 py-1 text-xs bg-background rounded focus:ring-1 focus:ring-ring">Home</button>
            <button className="px-2 py-1 text-xs bg-background rounded focus:ring-1 focus:ring-ring">About</button>
            <button className="px-2 py-1 text-xs bg-background rounded focus:ring-1 focus:ring-ring">Services</button>
            <button className="px-2 py-1 text-xs bg-background rounded focus:ring-1 focus:ring-ring">Blog</button>
            <button className="px-2 py-1 text-xs bg-background rounded focus:ring-1 focus:ring-ring">Contact</button>
          </nav>
          <div className="text-sm text-muted-foreground">
            Main content - many tabs away!
          </div>
        </div>
        <div className="mt-3 p-2 border border-error/30 rounded text-xs text-error">
          No skip link = tedious keyboard navigation
        </div>
      </div>
      <p className="text-xs text-error">
        Without skip link, keyboard users must tab through every nav item
      </p>
    </div>
  );
}
