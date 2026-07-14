import { useLayoutEffect, useRef, useState } from 'react';

const ITEMS = ['Alpha', 'Beta', 'Gamma', 'Delta'];

/**
 * GOOD: FLIP — First, Last, Invert, Play.
 * Measure once before the change and once after, apply the inverse transform so the
 * element still LOOKS unmoved, then release it in a single rAF. Layout runs twice.
 * Everything the user sees is a compositor-driven transform.
 */
export function FlipTechniqueGood() {
  const [order, setOrder] = useState(ITEMS);
  const nodes = useRef<Record<string, HTMLLIElement | null>>({});
  const firstRects = useRef<Record<string, number>>({});

  useLayoutEffect(() => {
    const pending = firstRects.current;
    if (Object.keys(pending).length === 0) return;
    firstRects.current = {};

    // LAST: one read per element, all reads batched before any write.
    const lastTops: Record<string, number> = {};
    for (const name of ITEMS) {
      const node = nodes.current[name];
      if (node) lastTops[name] = node.getBoundingClientRect().top;
    }

    // INVERT: writes only, no reads mixed in.
    for (const name of ITEMS) {
      const node = nodes.current[name];
      if (!node || pending[name] === undefined) continue;
      node.style.transition = 'none';
      node.style.transform = `translateY(${pending[name] - lastTops[name]}px)`;
    }

    // PLAY: hand it to the compositor and let transform interpolate back to zero.
    requestAnimationFrame(() => {
      for (const name of ITEMS) {
        const node = nodes.current[name];
        if (!node) continue;
        node.style.transition = 'transform 320ms cubic-bezier(0.2, 0, 0, 1)';
        node.style.transform = '';
      }
    });
  }, [order]);

  const shuffle = () => {
    // FIRST: measure once, before the DOM changes.
    const tops: Record<string, number> = {};
    for (const name of ITEMS) {
      const node = nodes.current[name];
      if (node) tops[name] = node.getBoundingClientRect().top;
    }
    firstRects.current = tops;
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

      <ul className="space-y-2 motion-reduce:transition-none">
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

      <p className="text-xs text-success">
        Two measurements total, all reads before any writes, and the motion itself is pure `transform` —
        the browser never lays out mid-animation. Same visual result, none of the thrash.
      </p>
    </div>
  );
}
