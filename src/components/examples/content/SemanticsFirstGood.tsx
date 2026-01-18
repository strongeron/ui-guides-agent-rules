export function SemanticsFirstGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Submit Form
          </button>
          <a
            href="#docs"
            className="inline-block text-blue-600 underline hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            View Documentation
          </a>
        </div>
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
          <code className="text-xs text-green-800 font-mono block whitespace-pre">
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
