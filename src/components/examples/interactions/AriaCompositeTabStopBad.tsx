import { useEffect, useRef, useState } from 'react';

const FILTERS = [
  'All',
  'Open',
  'Closed',
  'Merged',
  'Draft',
  'Mine',
  'Assigned',
  'Mentioned',
  'Stale',
  'Blocked',
  'Ready',
  'Archived',
];

export function AriaCompositeTabStopBad() {
  const listRef = useRef<HTMLDivElement>(null);
  const [tabStops, setTabStops] = useState(0);
  const [visited, setVisited] = useState<string[]>([]);
  const [selected, setSelected] = useState('All');

  // Counted from the live DOM, not asserted in a caption.
  useEffect(() => {
    const options = listRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
    setTabStops(
      Array.from(options ?? []).filter((el) => el.tabIndex >= 0).length
    );
  }, []);

  return (
    <div className="w-full max-w-sm">
      <button
        type="button"
        className="mb-3 rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Start here, then hold Tab
      </button>

      {/* Every option is its own tab stop. The composite is not one widget to the
          keyboard — it is twelve unrelated stops in the page's tab sequence. */}
      <div
        ref={listRef}
        role="listbox"
        aria-label="Filters"
        className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-2"
      >
        {FILTERS.map((filter) => (
          <div
            key={filter}
            role="option"
            aria-selected={selected === filter}
            tabIndex={0}
            onFocus={() =>
              setVisited((prev) =>
                prev.includes(filter) ? prev : [...prev, filter]
              )
            }
            onClick={() => setSelected(filter)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelected(filter);
              }
            }}
            className={`cursor-pointer rounded px-2 py-1 text-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
              selected === filter
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            }`}
          >
            {filter}
          </div>
        ))}
      </div>

      <p className="mt-3 rounded border border-border bg-muted px-3 py-2 text-xs text-foreground">
        Tab stops inside this one widget:{' '}
        <span className="font-medium text-destructive">{tabStops}</span>
        <br />
        Reached so far by tabbing:{' '}
        <span className="font-medium">{visited.length}</span> / {FILTERS.length}
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Focus the button above and hold Tab. It takes twelve presses to get <em>past</em>{' '}
        a single filter bar, and the arrow keys — which is what a screen reader user
        will reach for inside a listbox — do nothing at all. Now imagine this widget
        sitting between the reader and the form they came for.
      </p>

      <p className="mt-2 text-xs text-destructive">
        A composite widget with 12 tab stops instead of 1
      </p>
    </div>
  );
}
