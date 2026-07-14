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

/** Constrained when the device or the network tells us it cannot afford the heavy treatment. */
function isConstrained(caps: Caps): boolean {
  if (caps.saveData) return true;
  if (caps.memory !== undefined && caps.memory < 4) return true;
  if (caps.cores !== undefined && caps.cores < 4) return true;
  if (caps.effectiveType && ['slow-2g', '2g', '3g'].includes(caps.effectiveType)) return true;
  return false;
}

const ORBS = Array.from({ length: 12 }, (_, i) => i);

export function AdaptiveCapabilitiesGood() {
  const [simulateLowEnd, setSimulateLowEnd] = useState(false);
  const caps = readCaps();
  const constrained = simulateLowEnd || isConstrained(caps);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="relative h-32 overflow-hidden rounded-md bg-muted">
          {constrained ? (
            // Lighter treatment: one static gradient, no blur filter, no animation.
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
          ) : (
            ORBS.map((i) => (
              <div
                key={i}
                className="absolute h-16 w-16 animate-pulse rounded-full bg-primary/40 blur-2xl"
                style={{ left: `${(i * 37) % 85}%`, top: `${(i * 53) % 70}%` }}
              />
            ))
          )}
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
            className="size-4 accent-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          Simulate a low-end device / Save-Data
        </label>

        <div className="text-xs font-medium tabular-nums text-success">
          animated blur layers rendered: {constrained ? 0 : ORBS.length}
          {constrained ? ' — downgraded to a static gradient' : ''}
        </div>
      </div>
      <p className="text-xs text-success">
        Read <code>deviceMemory</code>, <code>hardwareConcurrency</code> and{' '}
        <code>connection.effectiveType</code>/<code>saveData</code>, then drop the expensive effects
        when the device says it cannot afford them. Toggle the checkbox: the blur layers disappear.
      </p>
    </div>
  );
}
