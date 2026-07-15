import { useState } from 'react';
import { playTone } from '@/components/demo-kit/playBlip';

/**
 * A harsh, loud, dissonant sawtooth buzzer on every validation error. It startles,
 * it feels like a reprimand, and the escape hatch users reach for is to mute ALL sound —
 * taking the useful confirmations down with it.
 */
export function SoundNotPunishingBad() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [errored, setErrored] = useState(false);

  const triggerError = () => {
    // Loud, low, dissonant sawtooth = alarm, not information.
    if (soundEnabled) playTone({ frequency: 160, duration: 0.5, type: 'sawtooth', volume: 0.55, dissonant: true });
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
          Enable sound for this demo (off by default — it is loud)
        </label>

        <button
          type="button"
          onClick={triggerError}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Submit with an invalid field
        </button>
        <p role="status" aria-live="polite" className={`mt-3 min-h-4 text-xs ${errored ? 'text-destructive' : ''}`}>
          {errored ? 'Error: enter a valid email' : ''}
        </p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        A harsh, loud buzzer punishes the user for a typo — so they mute everything and lose the good cues too.
      </p>
    </div>
  );
}
