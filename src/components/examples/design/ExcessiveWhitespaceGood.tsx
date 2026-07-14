export function ExcessiveWhitespaceGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Balanced Spacing</h4>
        <form className="space-y-4 p-3 bg-muted rounded-lg" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
          </div>
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
            Submit
          </button>
        </form>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code>space-y-4 between fields, space-y-1.5 for label/input</code>
        </div>
      </div>
      <p className="text-xs text-success">
        Labels stay connected to inputs, fields properly separated
      </p>
    </div>
  );
}
