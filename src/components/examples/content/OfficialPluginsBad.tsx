export function OfficialPluginsBad() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-1">Registering plugins the v3 way</h4>
        <p className="text-xs text-muted-foreground mb-3">
          There is no <code className="font-mono">plugins: []</code> array, because there is no config file.
        </p>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto">
          <pre className="text-error">{`// tailwind.config.js — not read by v4
plugins: [
  require('@tailwindcss/typography'),
  require('@tailwindcss/forms'),
  require('@tailwindcss/container-queries'),
]`}</pre>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h5 className="text-sm font-medium mb-1">And one of them should not be there at all</h5>
        <div className="bg-muted rounded-md p-3 font-mono text-xs overflow-x-auto mt-3">
          <pre className="text-error">{`npm i @tailwindcss/container-queries   # deprecated`}</pre>
        </div>
        <ul className="mt-3 text-xs space-y-2">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              Container queries are <em>core</em> in v4 — <code className="font-mono">@container</code> and{' '}
              <code className="font-mono">@md:</code> already work.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-error" />
            <span>
              Installing it adds a dead dependency that shadows a built-in and tells the next reader this codebase never
              finished its upgrade.
            </span>
          </li>
        </ul>
      </div>

      <p className="text-xs text-error">
        Plugins that v4 never loads, plus one that v4 already absorbed.
      </p>
    </div>
  );
}
