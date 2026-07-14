import { useEffect, useRef, useState } from 'react';

const ORIGINS = ['cdn.images.example', 'fonts.example', 'media.example'];

// Same simulated phase costs as the bad example.
const DNS = 140;
const TLS = 200;
const DOWNLOAD = 160;

type Phase = 'cold' | 'warming' | 'warm' | 'download' | 'done';

export function PreconnectAssetDomainsGood() {
  const [phases, setPhases] = useState<Phase[]>(() => ORIGINS.map(() => 'cold'));
  const [elapsed, setElapsed] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  // <link rel="preconnect"> warms DNS + TLS at page load, in parallel with everything else.
  useEffect(() => {
    const pending = timers.current;
    setPhases(ORIGINS.map(() => 'warming'));
    pending.push(window.setTimeout(() => setPhases(ORIGINS.map(() => 'warm')), DNS + TLS));
    return () => pending.forEach(clearTimeout);
  }, []);

  const run = () => {
    setElapsed(null);
    const t0 = performance.now();
    setPhases(ORIGINS.map(() => 'download'));
    timers.current.push(
      window.setTimeout(() => {
        setPhases(ORIGINS.map(() => 'done'));
        setElapsed(Math.round(performance.now() - t0));
      }, DOWNLOAD)
    );
  };

  const warmed = phases.every((p) => p !== 'cold' && p !== 'warming');

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="space-y-0.5 font-mono text-[11px] text-muted-foreground">
          {ORIGINS.map((o) => (
            <div key={o}>&lt;link rel=&quot;preconnect&quot; href=&quot;https://{o}&quot;&gt;</div>
          ))}
        </div>

        <div className="space-y-2">
          {ORIGINS.map((origin, i) => {
            const phase = phases[i];
            const handshakeDone = phase === 'warm' || phase === 'download' || phase === 'done';
            const downloaded = phase === 'download' || phase === 'done';
            return (
              <div key={origin} className="space-y-1">
                <div className="font-mono text-[11px] text-foreground">{origin}</div>
                <div className="flex h-3 gap-0.5">
                  <div
                    className={`w-24 rounded-sm ${handshakeDone ? 'bg-success' : 'bg-muted'}`}
                    title="DNS + TLS, done before you asked"
                  />
                  <div
                    className={`w-12 rounded-sm ${downloaded ? 'bg-primary' : 'bg-muted'}`}
                    title="download"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={run}
            disabled={!warmed}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Request assets
          </button>
          <span className="text-xs tabular-nums text-muted-foreground">
            {!warmed
              ? 'warming connections…'
              : elapsed === null
                ? 'connections warm — ready'
                : `${elapsed} ms to first byte-to-done`}
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground">
          Green = handshake already completed at page load, blue = the actual download.
        </div>
      </div>
      <p className="text-xs text-success">
        Preconnect moves DNS + TLS off the critical path, so requesting an asset costs only the
        download. Same bytes, a whole handshake sooner. (Phases are simulated.)
      </p>
    </div>
  );
}
