import { useEffect, useRef, useState } from 'react';

interface Row {
  visible: string;
  name: string;
  mismatch: boolean;
}

/** Simplified accessible-name calculation: aria-labelledby, then aria-label, then child content. */
function accessibleName(el: HTMLElement): string {
  const labelledBy = el.getAttribute('aria-labelledby');
  if (labelledBy) {
    const text = labelledBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
      .join(' ')
      .trim();
    if (text) return text;
  }
  const label = el.getAttribute('aria-label')?.trim();
  if (label) return label;
  return el.textContent?.trim() ?? '';
}

export function AriaLabelOverridesVisibleTextGood() {
  const barRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [command, setCommand] = useState('click Save');
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const buttons = barRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [];
    setRows(
      Array.from(buttons).map((b) => {
        const visible = b.textContent?.trim() ?? '';
        const name = accessibleName(b);
        return { visible, name, mismatch: Boolean(visible) && !name.toLowerCase().includes(visible.toLowerCase()) };
      })
    );
  }, []);

  const run = () => {
    const target = command.replace(/^\s*click\s+/i, '').trim();
    const buttons = Array.from(barRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);
    // Voice control matches on the accessible name, not on what you can see.
    const hit = buttons.find((b) => accessibleName(b).toLowerCase().includes(target.toLowerCase()));
    if (hit) {
      hit.click();
      setResult({ ok: true, message: `Activated "${accessibleName(hit)}"` });
      return;
    }
    setResult({ ok: false, message: `No control named "${target}".` });
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div ref={barRef} className="flex gap-2 rounded-lg border border-border bg-card p-3">
        <button
          type="button"
          onClick={() => setStatus('Draft saved')}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setStatus('Changes discarded')}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Cancel
        </button>
        {/* Icon plus text: the name is pulled from the visible span, so it still matches what is said. */}
        <button
          type="button"
          aria-labelledby="alov-delete-label"
          onClick={() => setStatus('Invoice deleted')}
          className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5h6v2m-8 0 1 12h8l1-12" />
          </svg>
          <span id="alov-delete-label">Delete</span>
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <p className="mb-2 text-xs font-semibold text-foreground">What the button says vs. what it is called</p>
        <ul className="space-y-1">
          {rows.map((r) => (
            <li key={r.visible} className="font-mono text-xs text-foreground">
              &quot;{r.visible}&quot; → accessible name &quot;{r.name}&quot;{' '}
              {r.mismatch ? (
                <span className="text-destructive">mismatch</span>
              ) : (
                <span className="text-success">match</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <label htmlFor="voice-good" className="mb-1 block text-xs font-medium text-foreground">
          Voice command
        </label>
        <div className="flex gap-2">
          <input
            id="voice-good"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') run();
            }}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="button"
            onClick={run}
            className="shrink-0 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Speak
          </button>
        </div>
        <p aria-live="polite" className={`mt-2 text-xs ${result?.ok ? 'text-success' : 'text-destructive'}`}>
          {result?.message}
        </p>
        {status && <p className="mt-1 text-xs text-muted-foreground">{status}</p>}
      </div>

      <p className="text-xs text-success">
        The visible text is the accessible name — typed straight from child content, or referenced with{' '}
        <code>aria-labelledby</code>. Say &quot;click Save&quot; and the button actually fires.
      </p>
    </div>
  );
}
