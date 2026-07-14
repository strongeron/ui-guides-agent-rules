import { useState } from 'react';

const BASE = 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb';
// Distinct widths => distinct resources, so each one is a real separate request.
const WIDTHS = [300, 301, 302, 303, 304, 305, 306, 307];

export function LazyLoadBelowFoldBad() {
  const [loaded, setLoaded] = useState(0);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="rounded-lg border border-border bg-card p-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Scroll the panel ↓</span>
          <span className="font-medium tabular-nums text-error">
            images downloaded: {loaded}/{WIDTHS.length}
          </span>
        </div>

        <div className="h-56 space-y-2 overflow-y-auto rounded-md bg-muted p-2 [overscroll-behavior:contain]">
          {WIDTHS.map((w, i) => (
            <figure key={w} className="space-y-1">
              <img
                src={`${BASE}&w=${w}`}
                alt=""
                width={280}
                height={110}
                loading="eager"
                decoding="async"
                onLoad={() => setLoaded((n) => n + 1)}
                className="h-[110px] w-full rounded object-cover"
              />
              <figcaption className="text-[11px] text-muted-foreground">
                {i === 0 ? 'Hero (above the fold)' : `Card ${i} — below the fold`}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="text-xs text-error">
        Every image is <code>loading=&quot;eager&quot;</code>: the counter hits 8/8 before you scroll
        a single pixel. Seven of those downloads compete with the hero for bandwidth and may never be
        seen.
      </p>
    </div>
  );
}
