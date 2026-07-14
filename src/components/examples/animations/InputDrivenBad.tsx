import { useState } from 'react';

/**
 * Bad: the hero animates *at* you. Nothing asked for it — the badge floats and
 * the arrow bobs on an infinite loop from the moment the section mounts, and
 * they will still be doing it in five minutes.
 */
export function InputDrivenBad() {
  const [mountKey, setMountKey] = useState(0);

  return (
    <div className="w-full space-y-4">
      <button
        onClick={() => setMountKey((k) => k + 1)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        Remount hero
      </button>

      <div key={mountKey} className="rounded-lg border border-border bg-card p-5 text-center">
        <span
          className="inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
          style={{ animation: 'idFloat 1.6s ease-in-out infinite alternate' }}
        >
          New
        </span>
        <p className="mt-3 text-sm font-medium text-card-foreground">Ship in one command</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground">
          Get started
          <span
            aria-hidden="true"
            className="inline-block"
            style={{ animation: 'idBob 1.1s ease-in-out infinite alternate' }}
          >
            →
          </span>
        </span>
      </div>

      <style>{`
        @keyframes idFloat { from { transform: translateY(0); } to { transform: translateY(-5px); } }
        @keyframes idBob { from { transform: translateX(0); } to { transform: translateX(6px); } }
      `}</style>

      <p className="text-xs text-destructive">
        Autoplay, forever, on mount. It burns attention (and battery) whether or not the user is even looking at it.
      </p>
    </div>
  );
}
