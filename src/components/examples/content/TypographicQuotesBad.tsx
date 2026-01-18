export function TypographicQuotesBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <blockquote className="text-sm text-foreground italic mb-2">
          "Design is not just what it looks like and feels like. Design is how it works."
        </blockquote>
        <p className="text-xs text-muted-foreground">- Steve Jobs</p>
      </div>
      <p className="text-xs text-error mt-4">
        Straight quotes look unpolished
      </p>
    </div>
  );
}
