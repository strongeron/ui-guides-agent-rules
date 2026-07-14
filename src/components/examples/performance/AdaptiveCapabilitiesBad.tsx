import { useState } from 'react';

interface Caps {
  cores?: number;
  memory?: number;
  effectiveType?: string;
  saveData?: boolean;
}

function readCaps(): Caps {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string; saveData?: boolean };
  };
  return {
    cores: nav.hardwareConcurrency,
    memory: nav.deviceMemory,
    effectiveType: nav.connection?.effectiveType,
    saveData: nav.connection?.saveData,
  };
}

const ORBS = Array.from({ length: 12 }, (_, i) => i);

export function AdaptiveCapabilitiesBad() {
  const [simulateLowEnd, setSimulateLowEnd] = useState(false);
  const caps = readCaps();

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        {/* Always the heavy treatment: 12 animated, blurred layers, no matter the device. */}
        <div className="relative h-32 overflow-hidden rounded-md bg-muted">
          {ORBS.map((i) => (
            <div
              key={i}
              className="absolute h-16 w-16 animate-pulse rounded-full bg-primary/40 blur-2xl"
              style={{ left: `${(i * 37) % 85}%`, top: `${(i * 53) % 70}%` }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
            Hero
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          <dt className="text-muted-foreground">hardwareConcurrency</dt>
          <dd className="tabular-nums text-foreground">{caps.cores ?? 'n/a'}</dd>
          <dt className="text-muted-foreground">deviceMemory</dt>
          <dd className="tabular-nums text-foreground">
            {caps.memory ? `${caps.memory} GB` : 'n/a'}
          </dd>
          <dt className="text-muted-foreground">connection</dt>
          <dd className="text-foreground">{caps.effectiveType ?? 'n/a'}</dd>
          <dt className="text-muted-foreground">saveData</dt>
          <dd className="text-foreground">{String(caps.saveData ?? false)}</dd>
        </dl>

        <label className="flex items-center gap-2 text-xs text-foreground">
          <input
            type="checkbox"
            checked={simulateLowEnd}
            onChange={(e) => setSimulateLowEnd(e.target.checked)}
            className="size-4 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          Simulate a low-end device / Save-Data
        </label>

        <div className="text-xs font-medium tabular-nums text-error">
          animated blur layers rendered: {ORBS.length}
          {simulateLowEnd ? ' — still 12, the signal is ignored' : ''}
        </div>
      </div>
      <p className="text-xs text-error">
        The capabilities are right there in <code>navigator</code>, and nothing reads them. A 2-core
        phone on 3G with Save-Data on gets the exact same 12 animated blur layers as a desktop.
      </p>
    </div>
  );
}
