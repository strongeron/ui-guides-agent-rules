export function RamsFormLabelsGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Inputs with Labels</h4>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="good-email" className="text-sm font-medium">
              Email address
            </label>
            <input
              id="good-email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="good-password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="good-password"
              type="password"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          <div className="bg-muted rounded p-2 font-mono text-xs">
            <code>{'<label htmlFor="email">Email</label>'}</code>
          </div>
        </form>
      </div>
      <p className="text-xs text-success">
        Screen reader announces: "Email address, edit text"
      </p>
    </div>
  );
}
