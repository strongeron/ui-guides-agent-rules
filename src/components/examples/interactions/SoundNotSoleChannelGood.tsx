import { useState } from 'react';
import { playBlip } from '@/components/demo-kit/playBlip';

/**
 * The same blip, plus a visible state change and an aria-live announcement.
 * Sound is a bonus channel for users who have it on; removing it costs nothing.
 */
export function SoundNotSoleChannelGood() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const [blips, setBlips] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) playBlip();
    setBlips((n) => n + 1);
    // The sound is the second channel. This is the first one.
    setStatus('sent');
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
          <label htmlFor="sound-good-email" className="block text-xs text-muted-foreground mb-1">
            Email
          </label>
          <input
            id="sound-good-email"
            type="email"
            autoComplete="email"
            defaultValue="ada@example.com"
            onChange={() => setStatus('idle')}
            className="mb-3 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            data-status={status}
            className={`w-full rounded-md px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
              status === 'sent'
                ? 'bg-success/15 text-success ring-1 ring-success'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {status === 'sent' ? '✓ Sent' : 'Submit'}
          </button>

          {/* Announced to screen readers, visible to everyone, audible to whoever wants it. */}
          <p role="status" aria-live="polite" className="mt-2 min-h-4 text-xs text-success">
            {status === 'sent' ? 'Submitted. We sent a confirmation to ada@example.com.' : ''}
          </p>
        </form>
        {/* ---- end product UI ---- */}

        <p className="mt-3 text-xs text-muted-foreground">
          Mute the tab and press Submit: the button flips to &ldquo;Sent&rdquo;, the message appears, the
          live region announces it. Turn sound on and you also get a blip. Every channel is redundant with
          the others.
        </p>

        <div className="mt-3 rounded-md border border-dashed border-border p-2">
          <p className="text-xs text-muted-foreground">
            Audio monitor — instrumentation for this demo, <em>not</em> part of the UI above:
          </p>
          <p className="mt-1 text-xs font-mono text-success" aria-live="polite">
            {blips === 0
              ? 'no submissions yet'
              : `${blips} success blip${blips > 1 ? 's' : ''} ${soundEnabled ? 'played' : 'suppressed (sound off)'} — the visual feedback landed either way`}
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Sound supplements a visible state change and a live region — muting it loses nothing
      </p>
    </div>
  );
}
