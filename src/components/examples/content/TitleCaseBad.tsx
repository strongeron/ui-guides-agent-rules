export function TitleCaseBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h4 className="text-base font-medium text-foreground">
          deployment protection
        </h4>
        <p className="text-sm text-muted-foreground">
          Restrict who can view your preview deployments.
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            save changes
          </button>
          <button className="px-3 py-2 bg-muted text-foreground text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Learn More about protection
          </button>
        </div>
      </div>
      <p className="text-xs text-error">
        Three casing styles in one card — the heading no longer reads as a
        heading and the buttons look unfinished
      </p>
    </div>
  );
}
