export function CustomUtilitiesGood() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Custom Utilities</h4>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">Definition</h5>
            <div className="font-mono text-xs bg-background rounded p-2">
              <pre className="text-foreground">{`@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .scrollbar-hide {
    scrollbar-width: none;
  }
}`}</pre>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">Usage with Variants</h5>
            <div className="font-mono text-xs bg-background rounded p-2 space-y-1">
              <code className="block">md:text-balance</code>
              <code className="block">hover:scrollbar-hide</code>
              <code className="block">dark:text-balance</code>
            </div>
            <p className="text-xs text-success mt-2">
              Works with all Tailwind variants!
            </p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <h5 className="text-sm font-medium mb-2">Benefits</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>Purged when unused</li>
              <li>Works with variants</li>
              <li>Follows Tailwind conventions</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Custom utilities integrate fully with Tailwind's system
      </p>
    </div>
  );
}
