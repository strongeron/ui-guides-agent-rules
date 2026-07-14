import { useState } from 'react';

const ITEMS = ['Netflix', 'GitHub', 'Bank of Mars', 'Figma', 'Vercel'];
const RESERVED = /pass|pwd|login|credential/i;

// The heuristic a password manager runs on every field it finds.
function credentialSignals(input: { type: string; name: string; id: string; autocomplete?: string }) {
  const hits: string[] = [];
  if (input.type === 'password') hits.push(`type="${input.type}"`);
  if (RESERVED.test(input.name)) hits.push(`name="${input.name}"`);
  if (RESERVED.test(input.id)) hits.push(`id="${input.id}"`);
  if (!input.autocomplete) hits.push('no autocomplete attribute');
  return hits;
}

export function NoPasswordManagerNonauthBad() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  // A search box for stored passwords — so it got called "password".
  const field = { type: 'text', name: 'password', id: 'password' };
  const signals = credentialSignals(field);
  const overlay = focused && (field.type === 'password' || RESERVED.test(field.name));

  const results = ITEMS.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <label htmlFor={field.id} className="block text-xs text-muted-foreground">
          Search saved items
        </label>
        <div className="relative">
          <input
            id={field.id}
            name={field.name}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Filter…"
            className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
          />

          <ul className="mt-2 space-y-1 text-sm text-foreground">
            {results.map((r) => (
              <li key={r} className="rounded-md bg-muted px-2 py-1">
                {r}
              </li>
            ))}
            {results.length === 0 && (
              <li className="px-2 py-1 text-xs text-muted-foreground">No matches</li>
            )}
          </ul>

          {overlay && (
            <div className="absolute inset-x-0 top-full z-10 mt-1 rounded-md border border-border bg-card p-2 shadow-lg">
              <div className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                Password manager (simulated)
              </div>
              <div className="rounded px-2 py-1 text-sm text-foreground">gleb@example.com</div>
              <div className="rounded px-2 py-1 text-sm text-foreground">admin@example.com</div>
            </div>
          )}
        </div>

        <div className="space-y-1 text-xs text-error">
          <div>Manager matched search on: {signals.join(', ')}</div>
          <div>{overlay ? 'Overlay open — it is covering your results.' : 'Focus the field.'}</div>
        </div>

        <div className="space-y-1 border-t border-border pt-3">
          <label htmlFor="otp-bad" className="block text-xs text-muted-foreground">
            One-time code
          </label>
          <input
            id="otp-bad"
            name="pwd_code"
            type="password"
            className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
          />
          <div className="text-xs text-error">
            Manager matched OTP on: {credentialSignals({ type: 'password', name: 'pwd_code', id: 'otp-bad' }).join(', ')}
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        A plain filter field named <code>password</code>, with no <code>autocomplete</code>, trips
        every credential heuristic a manager has. Focus it and the extension&apos;s dropdown lands on
        top of the very results you were trying to read — and it offers to <em>save</em> whatever you
        type as a new login. The OTP field masked as <code>type=&quot;password&quot;</code> is worse:
        the manager tries to store a code that expires in 30 seconds as a permanent credential.
      </p>
    </div>
  );
}
