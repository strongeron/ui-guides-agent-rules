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

export function AriaLabelOverridesVisibleTextBad() {
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
    const seen = buttons.find((b) => (b.textContent ?? '').trim().toLowerCase() === target.toLowerCase());
    setResult({
      ok: false,
      message: seen
        ? `No control named "${target}". The button you can see is named "${accessibleName(seen)}".`
        : `No control named "${target}".`,
    });
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div ref={barRef} className="flex gap-2 rounded-lg border border-border bg-card p-3">
        <button
          type="button"
          aria-label="Submit form"
          onClick={() => setStatus('Draft saved')}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Save
        </button>
        <button
          type="button"
          aria-label="Discard all changes and close"
          onClick={() => setStatus('Changes discarded')}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Cancel
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <p className="mb-2 text-xs font-semibold text-foreground">What the button says vs. what it is called</p>
        <ul className="space-y-1">
          {rows.map((r) => (
            <li key={r.visible} className="font-mono text-xs text-foreground">
              &quot;{r.visible}&quot; → accessible name &quot;{r.name}&quot;{' '}
              {r.mismatch && <span className="text-destructive">mismatch</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-3">
        <label htmlFor="voice-bad" className="mb-1 block text-xs font-medium text-foreground">
          Voice command
        </label>
        <div className="flex gap-2">
          <input
            id="voice-bad"
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

      <p className="text-xs text-destructive">
        Say &quot;click Save&quot; and nothing happens: <code>aria-label=&quot;Submit form&quot;</code> replaced the
        button&apos;s own content, so the word on screen names no control at all.
      </p>
    </div>
  );
}
