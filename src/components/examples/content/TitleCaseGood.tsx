export function TitleCaseGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h4 className="text-base font-medium text-foreground">
          Deployment Protection
        </h4>
        <p className="text-sm text-muted-foreground">
          Restrict who can view your preview deployments.
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Save Changes
          </button>
          <button className="px-3 py-2 bg-muted text-foreground text-sm rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Learn More
          </button>
        </div>
      </div>
      <p className="text-xs text-success">
        Chicago-style Title Case on the heading and both buttons: one rule,
        predictable chrome
      </p>
    </div>
  );
}
