export function RamsFormLabelsBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inputs without Labels</h4>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <span className="text-sm font-medium">Email address</span>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Password</span>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code className="text-error">{'<span>Email</span><input />'}</code>
          </div>
        </form>
      </div>
      <p className="text-xs text-error">
        Screen reader announces only: "edit text" with no context
      </p>
    </div>
  );
}
