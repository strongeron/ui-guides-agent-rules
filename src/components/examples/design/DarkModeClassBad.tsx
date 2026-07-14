export function DarkModeClassBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Setting a config option that isn&rsquo;t there</h4>
        <p className="text-xs text-muted-foreground mb-3">
          <code className="font-mono">darkMode</code> was removed in v4 along with the config file.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`// tailwind.config.js — not read by v4
module.exports = {
  darkMode: 'class',
}`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h5 className="text-sm font-medium">So the toggle does nothing</h5>
        <div className="flex gap-2 opacity-50">
          <button className="flex-1 px-3 py-2 bg-muted border border-border rounded text-sm" disabled>
            Light
          </button>
          <button className="flex-1 px-3 py-2 bg-muted border border-border rounded text-sm" disabled>
            Dark
          </button>
        </div>
        <ul className="text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              The <code className="font-mono">dark</code> variant still compiles to{' '}
              <code className="font-mono">prefers-color-scheme</code>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              Adding <code className="font-mono">.dark</code> to <code className="font-mono">&lt;html&gt;</code> changes
              nothing. The theme stays locked to the OS.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>No error, no warning. The switch just never fires.</span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-error">
        There is no darkMode option to set. The variant itself has to be redefined.
      </p>
    </div>
  );
}
