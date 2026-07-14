import { useState } from 'react';

const BASE = 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb';
// Different widths from the bad example so these are genuinely separate resources.
const WIDTHS = [320, 321, 322, 323, 324, 325, 326, 327];

export function LazyLoadBelowFoldGood() {
  const [loaded, setLoaded] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Scroll the panel ↓</span>
          <span className="font-medium tabular-nums text-success">
            images downloaded: {loaded}/{WIDTHS.length}
          </span>
        </div>

        <div className="h-56 space-y-2 overflow-y-auto rounded-md bg-muted p-2 [overscroll-behavior:contain]">
          {WIDTHS.map((w, i) => {
            const isHero = i === 0;
            return (
              <figure key={w} className="space-y-1">
                <img
                  src={`${BASE}&w=${w}`}
                  alt=""
                  width={280}
                  height={110}
                  // Hero is the LCP candidate: never lazy-load it.
                  loading={isHero ? 'eager' : 'lazy'}
                  fetchPriority={isHero ? 'high' : 'auto'}
                  decoding="async"
                  onLoad={() => setLoaded((n) => n + 1)}
                  className="h-[110px] w-full rounded object-cover"
                />
                <figcaption className="text-[11px] text-muted-foreground">
                  {isHero ? 'Hero — eager + fetchpriority=high' : `Card ${i} — loading="lazy"`}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-success">
        The hero loads eagerly; below-the-fold cards are <code>loading=&quot;lazy&quot;</code>, so the
        counter climbs only as you scroll them into view. The hero gets the bandwidth it needs, and
        images you never reach are never downloaded.
      </p>
    </div>
  );
}
