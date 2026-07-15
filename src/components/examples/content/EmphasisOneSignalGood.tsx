export function EmphasisOneSignalGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground">
        <p>
          This is <strong>important</strong>, the term <em>flush-left</em> has a precise meaning, and the
          full rules live in the{' '}
          <a
            href="#emphasis"
            className="text-primary underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            style guide
          </a>
          .
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        Bold alone for strong, italic alone for a term, underline reserved for the real link.
      </p>
    </div>
  );
}
