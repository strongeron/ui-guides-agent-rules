import { useEffect, useRef, useState } from 'react';

const CITIES = ['Berlin', 'Bergen', 'Belgrade', 'Bristol', 'Brno'];

function describeActiveElement(): string {
  const el = document.activeElement as HTMLElement | null;
  if (!el || el === document.body) return 'body — nothing focused';
  const tag = el.tagName.toLowerCase();
  const role = el.getAttribute('role');
  if (tag === 'input') return '<input> — typing goes here';
  const text = el.textContent?.trim().slice(0, 24);
  return `<${tag}${role ? ` role="${role}"` : ''}>${text ? ` "${text}"` : ''}`;
}

export function AriaActivedescendantBad() {
  const [query, setQuery] = useState('B');
  const [activeElement, setActiveElement] = useState('body — nothing focused');
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const matches = CITIES.filter((c) =>
    c.toLowerCase().startsWith(query.toLowerCase())
  );

  useEffect(() => {
    const sync = () => setActiveElement(describeActiveElement());
    document.addEventListener('focusin', sync);
    document.addEventListener('focusout', sync);
    document.addEventListener('keyup', sync);
    return () => {
      document.removeEventListener('focusin', sync);
      document.removeEventListener('focusout', sync);
      document.removeEventListener('keyup', sync);
    };
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-3">
        <label className="mb-1 block text-xs text-muted-foreground" htmlFor="city-bad">
          City
        </label>
        <input
          id="city-bad"
          role="combobox"
          aria-expanded="true"
          aria-controls="city-bad-list"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'ArrowDown') return;
            e.preventDefault();
            e.stopPropagation();
            // Real DOM focus is yanked out of the text field. The input is no
            // longer the active element, so it no longer receives keystrokes.
            optionRefs.current[0]?.focus();
          }}
          className="w-full rounded border border-input bg-background px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <div
          id="city-bad-list"
          role="listbox"
          aria-label="Cities"
          className="mt-2 space-y-0.5"
        >
          {matches.map((city, index) => (
            <div
              key={city}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              role="option"
              aria-selected="false"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
                e.preventDefault();
                e.stopPropagation();
                const next = index + (e.key === 'ArrowDown' ? 1 : -1);
                optionRefs.current[Math.min(Math.max(next, 0), matches.length - 1)]?.focus();
              }}
              className="cursor-pointer rounded px-2 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {city}
            </div>
          ))}
          {matches.length === 0 && (
            <p className="px-2 py-1 text-sm text-muted-foreground">No matches</p>
          )}
        </div>
      </div>

      <p className="mt-3 rounded border border-border bg-muted px-3 py-2 text-xs text-foreground">
        <span className="text-muted-foreground">document.activeElement:</span>{' '}
        <span className="font-medium text-destructive">{activeElement}</span>
        <br />
        <span className="text-muted-foreground">Input value:</span>{' '}
        <span className="font-medium">{query || '(empty)'}</span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Click the field, press ArrowDown once, then keep typing letters. The readout
        shows focus has left the input — so nothing you type lands, the value is frozen,
        and there is no way back to refining the query. On a phone the software keyboard
        drops away; with an IME, composition is destroyed mid-word.
      </p>

      <p className="mt-2 text-xs text-destructive">
        Moving real DOM focus out of the text field breaks the thing the field is for
      </p>
    </div>
  );
}
