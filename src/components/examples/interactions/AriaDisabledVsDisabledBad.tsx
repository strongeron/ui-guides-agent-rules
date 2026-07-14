import { useEffect, useRef, useState } from 'react';

const ITEMS = [
  { label: 'New file', unavailable: false },
  { label: 'Duplicate', unavailable: false },
  { label: 'Add comment', unavailable: true },
  { label: 'Rename', unavailable: false },
  { label: 'Move to…', unavailable: true },
  { label: 'Delete', unavailable: true },
];

export function AriaDisabledVsDisabledBad() {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reachable, setReachable] = useState(0);
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const nodes = menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
    setReachable(Array.from(nodes ?? []).filter((el) => !el.disabled).length);
  }, []);

  // The classic "skip the disabled ones" loop. A disabled button cannot take
  // focus, so the only way to keep the arrows working is to jump over it —
  // which is exactly how the user never learns those commands exist.
  const moveTo = (from: number, step: number) => {
    let i = from + step;
    while (i >= 0 && i < ITEMS.length && ITEMS[i].unavailable) i += step;
    if (i < 0 || i >= ITEMS.length) return;
    setActive(i);
    itemRefs.current[i]?.focus();
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
          moveTo(active, e.key === 'ArrowDown' ? 1 : -1);
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
            // `disabled` drops the item out of the tab order AND makes it
            // unfocusable, so it is unreachable by any keyboard route.
            disabled={item.unavailable}
            tabIndex={index === active ? 0 : -1}
            onFocus={() =>
              setVisited((prev) =>
                prev.includes(item.label) ? prev : [...prev, item.label]
              )
            }
            className="block w-full rounded px-2 py-1 text-left text-sm text-foreground hover:bg-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-3 rounded border border-border bg-muted px-3 py-2 text-xs text-foreground">
        Items the arrow keys can reach:{' '}
        <span className="font-medium text-destructive">{reachable}</span> of {ITEMS.length}
        <br />
        Reached so far: <span className="font-medium">{visited.length}</span>
      </p>

      <p className="mt-3 text-xs text-muted-foreground">
        Tab into the menu, then hold ArrowDown to the bottom. You will land on{' '}
        <em>New file</em>, <em>Duplicate</em>, <em>Rename</em> — and stop. A screen
        reader user is never told that <em>Add comment</em>, <em>Move to…</em> and{' '}
        <em>Delete</em> are even part of this menu, so they cannot ask why the commands
        are unavailable or how to unlock them.
      </p>

      <p className="mt-2 text-xs text-destructive">
        HTML disabled inside a composite widget silently deletes the option from the keyboard
      </p>
    </div>
  );
}
