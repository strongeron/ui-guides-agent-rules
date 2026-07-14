import { useEffect, useState } from 'react';

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

export function AriaActivedescendantGood() {
  const [query, setQuery] = useState('B');
  const [active, setActive] = useState(0);
  const [activeElement, setActiveElement] = useState('body — nothing focused');

  const matches = CITIES.filter((c) =>
    c.toLowerCase().startsWith(query.toLowerCase())
  );
  const activeIndex = Math.min(active, Math.max(matches.length - 1, 0));

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
        <label className="mb-1 block text-xs text-muted-foreground" htmlFor="city-good">
          City
        </label>
        <input
          id="city-good"
          role="combobox"
          aria-expanded="true"
          aria-controls="city-good-list"
          // Focus stays here. This attribute POINTS at the active option instead
          // of moving to it — assistive tech announces the option, the caret,
          // the IME and the software keyboard all stay put.
          aria-activedescendant={
            matches.length > 0 ? `city-good-opt-${activeIndex}` : undefined
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
            e.preventDefault();
            e.stopPropagation();
            const next = activeIndex + (e.key === 'ArrowDown' ? 1 : -1);
            setActive(Math.min(Math.max(next, 0), matches.length - 1));
          }}
          className="w-full rounded border border-input bg-background px-2 py-1 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        />

        <div
          id="city-good-list"
          role="listbox"
          aria-label="Cities"
          className="mt-2 space-y-0.5"
        >
          {matches.map((city, index) => (
            <div
              key={city}
              id={`city-good-opt-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => {
                setQuery(city);
                setActive(0);
              }}
              className={`cursor-pointer rounded px-2 py-1 text-sm ${
                index === activeIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground'
              }`}
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
        <span className="font-medium text-success">{activeElement}</span>
        <br />
        <span className="text-muted-foreground">Input value:</span>{' '}
        <span className="font-medium">{query || '(empty)'}</span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Click the field and press ArrowDown a few times — the highlight moves, but the
        readout never stops saying <code>&lt;input&gt;</code>. Keep typing and the list
        keeps filtering. Note the trade: <code>aria-activedescendant</code> owes you the
        scrolling that roving tabindex got free from the browser, so a long list must be
        scrolled into view by hand.
      </p>

      <p className="mt-2 text-xs text-success">
        DOM focus stays in the input; only the pointer to the active option moves
      </p>
    </div>
  );
}
