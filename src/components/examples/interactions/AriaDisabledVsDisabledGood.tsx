import { useEffect, useRef, useState } from 'react';

const ITEMS = [
  { label: 'New file', unavailable: false },
  { label: 'Duplicate', unavailable: false },
  { label: 'Add comment', unavailable: true },
  { label: 'Rename', unavailable: false },
  { label: 'Move to…', unavailable: true },
  { label: 'Delete', unavailable: true },
];

export function AriaDisabledVsDisabledGood() {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reachable, setReachable] = useState(0);
  const [visited, setVisited] = useState<string[]>([]);
  const [log, setLog] = useState<string | null>(null);

  useEffect(() => {
    const nodes = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
    setReachable(Array.from(nodes ?? []).filter((el) => !el.disabled).length);
  }, []);

  // No skipping. Every item is focusable, so the arrows walk the real menu.
  const moveTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), ITEMS.length - 1);
    setActive(next);
    itemRefs.current[next]?.focus();
  };

  return (
    <div className="w-full max-w-sm">
      <div
        ref={menuRef}
        role="menu"
        aria-label="File actions"
        onKeyDown={(e) => {
          if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
          e.preventDefault();
          e.stopPropagation();
          moveTo(active + (e.key === 'ArrowDown' ? 1 : -1));
        }}
        className="space-y-0.5 rounded-lg border border-border bg-card p-2"
      >
        {ITEMS.map((item, index) => (
          <button
            key={item.label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            role="menuitem"
            // aria-disabled keeps the item focusable and announced ("dimmed" /
            // "unavailable"), so the option is discoverable. The handler — not
            // the browser — is responsible for making activation a no-op.
            aria-disabled={item.unavailable || undefined}
            tabIndex={index === active ? 0 : -1}
            onFocus={() =>
              setVisited((prev) =>
                prev.includes(item.label) ? prev : [...prev, item.label]
              )
            }
            onClick={() => {
              if (item.unavailable) {
                setLog(`“${item.label}” is unavailable — you have view-only access`);
                return;
              }
              setLog(`Ran “${item.label}”`);
            }}
            className={`block w-full rounded px-2 py-1 text-left text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
              item.unavailable
                ? 'cursor-default text-muted-foreground'
                : 'text-foreground hover:bg-accent'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-3 rounded border border-border bg-muted px-3 py-2 text-xs text-foreground">
        Items the arrow keys can reach:{' '}
        <span className="font-medium text-success">{reachable}</span> of {ITEMS.length}
        <br />
        Reached so far: <span className="font-medium">{visited.length}</span>
        <br />
        <span className="text-muted-foreground">{log ?? 'Nothing activated yet.'}</span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Tab into the menu and hold ArrowDown — focus lands on all six, including the
        three that are dimmed. Activate one: nothing happens to the file, and you are
        told <em>why</em> it is unavailable. Keep plain <code>disabled</code> for form
        controls whose state a label already explains; reach for{' '}
        <code>aria-disabled</code> in menus, toolbars, tabs, tree items and listbox
        options, where the option itself is the information.
      </p>

      <p className="mt-2 text-xs text-success">
        aria-disabled keeps the option discoverable while making activation a no-op
      </p>
    </div>
  );
}
