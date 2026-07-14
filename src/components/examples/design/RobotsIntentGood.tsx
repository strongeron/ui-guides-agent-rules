const ENVIRONMENTS = [
  { env: 'production', tag: 'index, follow', indexable: true },
  { env: 'preview', tag: 'noindex', indexable: false },
  { env: 'development', tag: 'noindex', indexable: false },
];

export function RobotsIntentGood() {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border border-border bg-card p-3 space-y-2">
        <p className="text-xs font-semibold text-foreground">
          One gate, resolved per environment
        </p>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th scope="col" className="pb-1 font-medium">Deploy</th>
              <th scope="col" className="pb-1 font-medium">robots</th>
              <th scope="col" className="pb-1 font-medium">In search?</th>
            </tr>
          </thead>
          <tbody>
            {ENVIRONMENTS.map(({ env, tag, indexable }) => (
              <tr key={env} className="border-t border-border">
                <td className="py-1 text-foreground">{env}</td>
                <td className="py-1 font-mono text-muted-foreground">{tag}</td>
                <td className={`py-1 font-medium ${indexable ? 'text-success' : 'text-muted-foreground'}`}>
                  {indexable ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs text-foreground"><code>{`const isProduction = process.env.VERCEL_ENV === 'production';

// noindex is the default; production is the one env that opts in.
{!isProduction && <meta name="robots" content="noindex" />}`}</code></pre>

      <p className="text-xs text-success">
        The tag is derived from the deploy, never hardcoded, so it always matches actual access
        intent. Defaulting to noindex means a new preview surface is safe on the day it ships, and
        the one env that opts in is the one you can check.
      </p>
    </div>
  );
}
