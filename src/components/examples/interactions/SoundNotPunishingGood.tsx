import { useState } from 'react';
import { playTone } from '@/components/demo-kit/playBlip';

/**
 * The same error, a soft low tone that dips gently and stops. Distinct enough to notice,
 * calm enough that no one reaches for the mute switch. The visual message still leads;
 * the sound only draws the eye to it.
 */
export function SoundNotPunishingGood() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [errored, setErrored] = useState(false);

  const triggerError = () => {
    // Gentle, brief, a soft downward sine — noticed, not punishing.
    if (soundEnabled) playTone({ frequency: 392, endFrequency: 294, duration: 0.28, type: 'sine', volume: 0.3 });
    setErrored(true);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <label className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          Enable sound for this demo (off by default)
        </label>

        <button
          type="button"
          onClick={triggerError}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Submit with an invalid field
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 min-h-4 text-xs ${errored ? 'text-destructive' : ''}`}
        >
          {errored ? 'Error: enter a valid email' : ''}
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        A soft, brief, downward tone marks the error without alarming — users keep sound on.
      </p>
    </div>
  );
}
