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

export function AriaCompositeTabStopGood() {
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tabStops, setTabStops] = useState(0);
  const [active, setActive] = useState(0); // the roving tabindex="0"
  const [selected, setSelected] = useState('All');

  // Recounted from the live DOM every time the roving index moves — it stays 1.
  useEffect(() => {
    const options = listRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
    setTabStops(
      Array.from(options ?? []).filter((el) => el.tabIndex >= 0).length
    );
  }, [active]);

  const moveTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), FILTERS.length - 1);
    setActive(next);
    optionRefs.current[next]?.focus();
  };

  return (
    <div className="w-full max-w-sm">
      <button
        type="button"
        className="mb-3 rounded border border-border px-2 py-1 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Start here, then press Tab
      </button>

      <div
        ref={listRef}
        role="listbox"
        aria-label="Filters"
        onKeyDown={(e) => {
          const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
          if (!keys.includes(e.key)) return;
          e.preventDefault();
          e.stopPropagation();
          if (e.key === 'Home') moveTo(0);
          else if (e.key === 'End') moveTo(FILTERS.length - 1);
          else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') moveTo(active + 1);
          else moveTo(active - 1);
        }}
        className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-2"
      >
        {FILTERS.map((filter, index) => (
          <div
            key={filter}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            role="option"
            aria-selected={selected === filter}
            // Exactly one option is reachable by Tab. The other eleven are still
            // focusable programmatically (-1), which is how the arrows reach them.
            tabIndex={index === active ? 0 : -1}
            onClick={() => {
              setActive(index);
              setSelected(filter);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelected(filter);
              }
            }}
            className={`cursor-pointer rounded px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
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
        <span className="font-medium text-success">{tabStops}</span>
        <br />
        Arrow keys currently on:{' '}
        <span className="font-medium">{FILTERS[active]}</span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Focus the button above and press Tab <em>once</em> — you are in the filter bar.
        Arrow keys walk the options (Home / End jump to the ends), Enter or Space
        selects, and one more Tab leaves the whole widget. Tab crosses widgets; arrows
        move within one.
      </p>

      <p className="mt-2 text-xs text-success">
        Roving tabindex: one tab stop for the composite, arrows for its contents
      </p>
    </div>
  );
}
