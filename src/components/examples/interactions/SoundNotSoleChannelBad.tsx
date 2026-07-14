import { useState } from 'react';
import { playBlip } from '@/components/demo-kit/playBlip';

/**
 * The only signal that Submit worked is a sound. On a muted tab — the default
 * state of most tabs — pressing Submit produces no observable change at all.
 * WCAG 1.3.3: feedback must not depend on a single sensory characteristic.
 */
export function SoundNotSoleChannelBad() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [blips, setBlips] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) playBlip();
    setBlips((n) => n + 1);
    // ...and that is the entire success path. Nothing visual happens.
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <label className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          Enable sound for this demo (off by default — nothing autoplays)
        </label>

        {/* ---- the product UI ---- */}
        <form onSubmit={handleSubmit} className="rounded-md border border-border bg-muted p-4">
          <label htmlFor="sound-bad-email" className="block text-xs text-muted-foreground mb-1">
            Email
          </label>
          <input
            id="sound-bad-email"
            type="email"
            autoComplete="email"
            defaultValue="ada@example.com"
            className="mb-3 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Submit
          </button>
        </form>
        {/* ---- end product UI: it never changes, no matter how many times you submit ---- */}

        <p className="mt-3 text-xs text-muted-foreground">
          Press Submit with the tab muted (the default). The form does not change. No label, no state, no
          message — nothing tells you it worked. Deaf and hard-of-hearing users get this experience
          permanently.
        </p>

        <div className="mt-3 rounded-md border border-dashed border-border p-2">
          <p className="text-xs text-muted-foreground">
            Audio monitor — instrumentation for this demo, <em>not</em> part of the UI above:
          </p>
          <p className="mt-1 text-xs font-mono text-destructive" aria-live="polite">
            {blips === 0
              ? 'no submissions yet'
              : `${blips} success blip${blips > 1 ? 's' : ''} ${soundEnabled ? 'played' : 'suppressed (sound off)'} — and that was the only feedback`}
          </p>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Sound is the sole success channel — with audio off, nothing observable happens
      </p>
    </div>
  );
}
