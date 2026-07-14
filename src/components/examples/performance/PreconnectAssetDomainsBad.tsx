import { useEffect, useRef, useState } from 'react';

const ORIGINS = ['cdn.images.example', 'fonts.example', 'media.example'];

// Simulated network phases (ms). Real numbers vary; the ordering is what matters.
const DNS = 140;
const TLS = 200;
const DOWNLOAD = 160;

type Phase = 'idle' | 'dns' | 'tls' | 'download' | 'done';

const WIDTH: Record<Exclude<Phase, 'idle' | 'done'>, string> = {
  dns: 'w-10',
  tls: 'w-14',
  download: 'w-12',
};

export function PreconnectAssetDomainsBad() {
  const [phases, setPhases] = useState<Phase[]>(() => ORIGINS.map(() => 'idle'));
  const [elapsed, setElapsed] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setElapsed(null);
    setPhases(ORIGINS.map(() => 'idle'));

    const t0 = performance.now();
    const set = (i: number, phase: Phase) =>
      setPhases((prev) => prev.map((p, idx) => (idx === i ? phase : p)));

    ORIGINS.forEach((_, i) => {
      // Cold connection: the browser has to do DNS + TLS before it can ask for a single byte.
      timers.current.push(window.setTimeout(() => set(i, 'dns'), 0));
      timers.current.push(window.setTimeout(() => set(i, 'tls'), DNS));
      timers.current.push(window.setTimeout(() => set(i, 'download'), DNS + TLS));
      timers.current.push(
        window.setTimeout(() => {
          set(i, 'done');
          if (i === ORIGINS.length - 1) setElapsed(Math.round(performance.now() - t0));
        }, DNS + TLS + DOWNLOAD)
      );
    });
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground">&lt;head&gt; — no preconnect</div>

        <div className="space-y-2">
          {ORIGINS.map((origin, i) => {
            const phase = phases[i];
            const reached = (p: Exclude<Phase, 'idle' | 'done'>) =>
              phase === 'done' ||
              (p === 'dns' && phase !== 'idle') ||
              (p === 'tls' && (phase === 'tls' || phase === 'download')) ||
              (p === 'download' && phase === 'download');

            return (
              <div key={origin} className="space-y-1">
                <div className="font-mono text-[11px] text-foreground">{origin}</div>
                <div className="flex h-3 gap-0.5">
                  {(['dns', 'tls', 'download'] as const).map((p) => (
                    <div
                      key={p}
                      className={`${WIDTH[p]} rounded-sm ${
                        reached(p)
                          ? p === 'download'
                            ? 'bg-primary'
                            : 'bg-error'
                          : 'bg-muted'
                      }`}
                      title={p}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={run}
            className="rounded-lg bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Request assets
          </button>
          <span className="text-xs tabular-nums text-muted-foreground">
            {elapsed === null ? '—' : `${elapsed} ms to first byte-to-done`}
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground">
          Red = DNS + TLS handshake, blue = the actual download.
        </div>
      </div>
      <p className="text-xs text-error">
        Every asset origin pays a cold DNS + TLS handshake before the first byte. The handshake
        blocks — here it costs more wall time than the download itself. (Phases are simulated.)
      </p>
    </div>
  );
}
