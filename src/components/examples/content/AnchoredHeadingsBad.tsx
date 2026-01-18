export function AnchoredHeadingsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-card dark:bg-muted px-4 py-3 text-sm font-medium sticky top-0">
          Fixed Header
        </div>
        <div className="p-4">
          <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
            <code className="text-xs text-error font-mono block">
              {'/* No scroll-margin-top */'}
              <br />
              {'h2 { }'}
            </code>
          </div>
          <p className="text-sm text-muted-foreground">
            When clicking anchor links (e.g., #section-2), the heading scrolls under the fixed header and becomes hidden.
          </p>
          <div className="mt-4 border-t pt-4">
            <div className="h-4 bg-muted rounded w-full" />
            <p className="text-xs text-muted-foreground mt-1">
              ↑ This heading is hidden behind the fixed header
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        Heading hidden behind fixed header on anchor jump
      </p>
    </div>
  );
}
