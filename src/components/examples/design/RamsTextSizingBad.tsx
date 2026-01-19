export function RamsTextSizingBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inconsistent Text Sizing</h4>
        <article className="space-y-2 p-4 bg-muted rounded-lg">
          <h5 style={{ fontSize: '19px' }} className="font-semibold">Article Title</h5>
          <p style={{ fontSize: '15px' }}>
            Body text at an odd size that doesn't match the scale.
          </p>
          <h6 style={{ fontSize: '17px' }} className="font-medium">Section Heading</h6>
          <p style={{ fontSize: '13px' }} className="text-muted-foreground">
            Another arbitrary size for secondary text.
          </p>
          <span style={{ fontSize: '11px' }} className="text-muted-foreground">
            And yet another random size
          </span>
        </article>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">19px, 17px, 15px, 13px, 11px - arbitrary</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Random sizes create unclear hierarchy
      </p>
    </div>
  );
}
