export function RamsTextSizingGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Consistent Type Scale</h4>
        <article className="space-y-2 p-4 bg-muted rounded-lg">
          <h5 className="text-xl font-semibold">Article Title</h5>
          <p className="text-base">
            Body text at the base size creates comfortable reading for long-form content.
          </p>
          <h6 className="text-lg font-medium">Section Heading</h6>
          <p className="text-sm text-muted-foreground">
            Smaller text for secondary information and captions.
          </p>
          <span className="text-xs text-muted-foreground">Fine print at smallest size</span>
        </article>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>text-xl, text-lg, text-base, text-sm, text-xs</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Clear hierarchy from consistent type scale
      </p>
    </div>
  );
}
