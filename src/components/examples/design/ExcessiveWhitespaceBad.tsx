export function ExcessiveWhitespaceBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Excessive Whitespace</h4>
        <form className="space-y-8 p-3 bg-muted rounded-lg" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
            />
          </div>
        </form>
        <div className="mt-3 bg-muted rounded p-2 font-mono text-xs">
          <code className="text-error">space-y-8 between fields, space-y-4 for label/input</code>
        </div>
      </div>
      <p className="text-xs text-error">
        Labels feel disconnected from inputs - poor visual grouping
      </p>
    </div>
  );
}
