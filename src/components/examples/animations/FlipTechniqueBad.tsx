import { useEffect, useRef, useState } from 'react';

const ITEMS = ['Alpha', 'Beta', 'Gamma', 'Delta'];

/**
 * BAD: animating the reorder by writing `top` every frame, with a
 * getBoundingClientRect() read inside the rAF loop.
 * Read, write, read, write — each read after a write forces a synchronous layout,
 * so the browser recomputes geometry 60 times a second. That is layout thrashing.
 */
export function FlipTechniqueBad() {
  const [order, setOrder] = useState(ITEMS);
  const nodes = useRef<Record<string, HTMLLIElement | null>>({});
  const animating = useRef(false);

  useEffect(() => {
    if (!animating.current) return;
    animating.current = false;

    const start = performance.now();
    const step = () => {
      const elapsed = (performance.now() - start) / 320;
      for (const name of ITEMS) {
        const node = nodes.current[name];
        if (!node) continue;
        // READ layout...
        const rect = node.getBoundingClientRect();
        const drift = (1 - Math.min(1, elapsed)) * (rect.height + 8);
        // ...then WRITE a layout property. Every frame. Forced reflow, every frame.
        node.style.position = 'relative';
        node.style.top = `${drift * (ITEMS.indexOf(name) % 2 === 0 ? -1 : 1)}px`;
      }
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [order]);

  const shuffle = () => {
    animating.current = true;
    setOrder((prev) => [...prev].reverse());
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={shuffle}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Reorder
      </button>

      <ul className="space-y-2">
        {order.map((name) => (
          <li
            key={name}
            ref={(node) => {
              nodes.current[name] = node;
            }}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
          >
            {name}
          </li>
        ))}
      </ul>

      <p className="text-xs text-destructive">
        `top` is a layout property and it is being written from a loop that also reads
        `getBoundingClientRect()`. The browser is forced to re-run layout on every frame — the reorder
        stutters, and it gets worse with every item you add.
      </p>
    </div>
  );
}
