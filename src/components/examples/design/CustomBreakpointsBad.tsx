import { useState } from 'react';

const rules = [
  { cls: 'min-[1919px]:hidden', at: 1919 },
  { cls: 'min-[1920px]:flex', at: 1920 },
  { cls: 'min-[1921px]:grid', at: 1921 },
];

export function CustomBreakpointsBad() {
  const [w, setW] = useState(1920);
  const activeCount = rules.filter((r) => w >= r.at).length;
  const inconsistent = activeCount > 0 && activeCount < rules.length;

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-medium">Drag the viewport width</h4>
          <span
            className={`rounded px-1.5 py-0.5 font-mono text-xs ${
              inconsistent ? 'bg-error/15 text-error' : 'bg-muted text-muted-foreground'
            }`}
          >
            {w}px
          </span>
        </div>

        <input
          type="range"
          min={1916}
          max={1924}
          value={w}
          onChange={(e) => setW(Number(e.target.value))}
          aria-label="Viewport width"
          className="w-full accent-primary"
        />

        <div className="mt-3 space-y-1.5">
          {rules.map((r) => {
            const on = w >= r.at;
            return (
              <div
                key={r.cls}
                className={`flex items-center justify-between rounded-md border px-2 py-1 font-mono text-xs ${
                  on ? 'border-error/40 bg-error/10 text-error' : 'border-border text-muted-foreground'
                }`}
              >
                <span>{r.cls}</span>
                <span>{on ? 'on' : 'off'}</span>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-3 rounded-md p-2 text-xs ${
            inconsistent
              ? 'border border-error/30 bg-error/10 text-error'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {inconsistent
            ? `${activeCount} of 3 rules fire — the switch that should happen at one width is smeared across this 1919–1921px band. The layout is in a state nobody designed.`
            : 'Here all three happen to agree — until the next person nudges one number and reopens the gap.'}
        </div>
      </div>

      <p className="text-xs text-error">
        Three inlined magic numbers, three thresholds. A single named token would switch at exactly one width;
        these drift into an off-by-one dead band no one intended.
      </p>
    </div>
  );
}
