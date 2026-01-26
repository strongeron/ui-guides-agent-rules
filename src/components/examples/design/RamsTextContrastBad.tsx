export function RamsTextContrastBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Poor Text Contrast</h4>
        <div className="space-y-3 p-4 bg-background rounded-lg border border-border">
          <h5 className="text-lg font-semibold text-[var(--ex-low-contrast-title)]">
            Card Title
          </h5>
          <p className="text-sm text-[var(--ex-low-contrast-body)]">
            This text has poor contrast - hard to read, especially in bright light or for those with low vision.
          </p>
          <p className="text-sm text-[var(--ex-low-contrast-secondary)]">
            This secondary text is even worse - nearly invisible against the background.
          </p>
        </div>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">text-low-contrast (~3:1), text-subtle-contrast (~2:1)</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Fails WCAG AA - difficult to read for many users
      </p>
    </div>
  );
}
