export function AnchoredHeadingsGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-gray-900 text-white px-4 py-3 text-sm font-medium sticky top-0">
          Fixed Header (48px)
        </div>
        <div className="p-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <code className="text-xs text-green-800 font-mono block whitespace-pre">
{`h2 {
  scroll-margin-top: 60px;
  /* 48px header + 12px padding */
}`}
            </code>
          </div>
          <p className="text-sm text-muted-foreground">
            With scroll-margin-top, anchor links position the heading below the fixed header, keeping it fully visible.
          </p>
          <div className="mt-4 border-t pt-4">
            <div className="h-4 bg-blue-200 rounded w-full" />
            <p className="text-xs text-muted-foreground mt-1">
              ↑ Heading visible below the fixed header
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        scroll-margin-top offsets anchor position below fixed header
      </p>
    </div>
  );
}
