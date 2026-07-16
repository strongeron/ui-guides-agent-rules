import { useState } from 'react';

const breakpoints = [
  { name: 'sm', px: 640, cols: 1 },
  { name: 'md', px: 768, cols: 2 },
  { name: 'lg', px: 1024, cols: 2 },
  { name: 'xl', px: 1280, cols: 3 },
  { name: '2xl', px: 1536, cols: 3 },
  { name: '3xl', px: 1920, cols: 4, custom: true },
];

export function CustomBreakpointsGood() {
  const [active, setActive] = useState(5);
  const bp = breakpoints[active];

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">Resize the viewport</h4>
          <span className="font-mono text-xs text-muted-foreground">≥ {bp.px}px</span>
        </div>

        <div className="mb-3 flex flex-wrap gap-1">
          {breakpoints.map((b, i) => (
            <button
              key={b.name}
              onClick={() => setActive(i)}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
                i === active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {b.name}
              {b.custom && (
                <span
                  className={`rounded-sm px-1 text-[9px] ${
                    i === active ? 'bg-primary-foreground/20' : 'bg-primary/15 text-primary'
                  }`}
                >
                  custom
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="rounded-md border border-border bg-muted/40 p-2">
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${bp.cols}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: bp.cols * 2 }).map((_, k) => (
              <div key={k} className="h-8 rounded bg-primary/15" />
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-md bg-muted p-2 font-mono text-xs">
          <span className="text-muted-foreground">applies </span>
          <span className="text-foreground">
            {bp.name}:grid-cols-{bp.cols}
          </span>
        </div>
      </div>

      <p className="text-xs text-success">
        The custom <code>3xl</code> token behaves like every built-in breakpoint — one name, sorted into the
        scale by its value, and the width is written down exactly once.
      </p>
    </div>
  );
}
