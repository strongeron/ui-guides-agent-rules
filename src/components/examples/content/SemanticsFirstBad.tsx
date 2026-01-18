export function SemanticsFirstBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-3">
          <div
            role="button"
            tabIndex={0}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90"
          >
            Submit Form
          </div>
          <div
            role="link"
            tabIndex={0}
            className="text-primary underline cursor-pointer hover:text-primary/80"
          >
            View Documentation
          </div>
        </div>
        <div className="mt-3 bg-error/10 border border-error/20 rounded-lg p-3">
          <code className="text-xs text-error font-mono block whitespace-pre">
{`<div role="button">...</div>
<div role="link">...</div>`}
          </code>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Divs with roles don't get native keyboard events, form submission, or middle-click behavior.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        ARIA roles on divs - missing native behaviors
      </p>
    </div>
  );
}
