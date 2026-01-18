export function SemanticsFirstGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-3">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Submit Form
          </button>
          <a
            href="#docs"
            className="inline-block text-primary underline hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Documentation
          </a>
        </div>
        <div className="mt-3 bg-success/10 border border-success/20 rounded-lg p-3">
          <code className="text-xs text-success font-mono block whitespace-pre">
{`<button type="submit">...</button>
<a href="#docs">...</a>`}
          </code>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Native elements have keyboard support, form integration, and expected browser behaviors built-in.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Native elements - full accessibility and behavior for free
      </p>
    </div>
  );
}
