export function ContentPathsBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-1">tailwind.config.js</h3>
        <p className="text-xs text-muted-foreground mb-3">Tailwind v4 — this file is not read at all</p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-foreground">{`export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.tsx',
  ],
}`}</pre>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-error" />
            <span className="text-sm">
              <code>content</code> was removed in v4 — this array is inert
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-error" />
            <span className="text-sm">
              The classes still build, so nobody notices the config does nothing
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-error" />
            <span className="text-sm">
              The one path it needed — a lib inside <code>node_modules</code> — is still missed
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-destructive">
        Copying a v3 <code>content</code> array into a v4 project is cargo cult: it is never read, and it hides the fact that the real gap was never closed
      </p>
    </div>
  );
}
