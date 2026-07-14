import { useState } from 'react';

const ITEMS = ['Netflix', 'GitHub', 'Bank of Mars', 'Figma', 'Vercel'];
const RESERVED = /pass|pwd|login|credential/i;

// The same heuristic a password manager runs — now it finds nothing to grab.
function credentialSignals(input: { type: string; name: string; id: string; autocomplete?: string }) {
  const hits: string[] = [];
  if (input.type === 'password') hits.push(`type="${input.type}"`);
  if (RESERVED.test(input.name)) hits.push(`name="${input.name}"`);
  if (RESERVED.test(input.id)) hits.push(`id="${input.id}"`);
  if (!input.autocomplete) hits.push('no autocomplete attribute');
  return hits;
}

export function NoPasswordManagerNonauthGood() {
  const [query, setQuery] = useState('');

  const field = { type: 'search', name: 'q', id: 'item-search', autocomplete: 'off' };
  const signals = credentialSignals(field);
  const otp = { type: 'text', name: 'otp', id: 'otp-good', autocomplete: 'one-time-code' };

  const results = ITEMS.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <label htmlFor={field.id} className="block text-xs text-muted-foreground">
          Search saved items
        </label>
        <div>
          <input
            id={field.id}
            name={field.name}
            type="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
        </div>

        <div className="space-y-1 text-xs text-success">
          <div>Manager matched search on: {signals.length ? signals.join(', ') : 'nothing'}</div>
          <div>No overlay — results stay readable while you type.</div>
        </div>

        <div className="space-y-1 border-t border-border pt-3">
          <label htmlFor={otp.id} className="block text-xs text-muted-foreground">
            One-time code
          </label>
          <input
            id={otp.id}
            name={otp.name}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
          />
          <div className="text-xs text-success">
            Manager matched OTP on: {credentialSignals(otp).length ? credentialSignals(otp).join(', ') : 'nothing'} —{' '}
            <code>one-time-code</code> tells the OS to offer the SMS code instead.
          </div>
        </div>
      </div>
      <p className="text-xs text-success">
        Non-auth fields say so. The filter is <code>type=&quot;search&quot;</code>,{' '}
        <code>name=&quot;q&quot;</code>, <code>autocomplete=&quot;off&quot;</code> — nothing a
        credential heuristic can latch onto, so the dropdown never covers the results. The OTP field
        claims the exact token it wants (<code>one-time-code</code>), which surfaces the code from
        SMS or the authenticator rather than a saved password.
      </p>
    </div>
  );
}
