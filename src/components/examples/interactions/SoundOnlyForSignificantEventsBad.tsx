import { useState } from 'react';
import { playBlip } from '@/components/demo-kit/playBlip';

/**
 * A blip on every keystroke. Typing is the highest-frequency interaction in any
 * interface — so this fires dozens of times a minute, becomes noise, and trains
 * the user to tune out every other sound the product makes, including the errors.
 */
export function SoundOnlyForSignificantEventsBad() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [value, setValue] = useState('');
  const [blips, setBlips] = useState(0);

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

        <div className="rounded-md border border-border bg-muted p-4">
          <label htmlFor="noisy-input" className="block text-xs text-muted-foreground mb-1">
            Search
          </label>
          <input
            id="noisy-input"
            value={value}
            onChange={(e) => {
              // Fires on every single character. Sound as texture, not as information.
              if (soundEnabled) playBlip();
              setBlips((n) => n + 1);
              setValue(e.target.value);
            }}
            placeholder="Type a sentence here…"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Type a sentence. Every keystroke blips. Nothing was confirmed, nothing failed, nothing needed your
          attention — the sound carries no information at all, and by the tenth character you have stopped
          hearing it.
        </p>

        <div className="mt-3 rounded-md border border-dashed border-border p-2">
          <p className="text-xs text-muted-foreground">Audio monitor — instrumentation, not product UI:</p>
          <p className="mt-1 text-xs font-mono text-destructive" aria-live="polite">
            {blips === 0
              ? 'no keystrokes yet'
              : `${blips} blip${blips > 1 ? 's' : ''} ${soundEnabled ? 'played' : 'suppressed (sound off)'} for ${blips} keystroke${blips > 1 ? 's' : ''} — a 1:1 ratio with typing`}
          </p>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Sound on a high-frequency interaction — it becomes noise, and takes the useful sounds down with it
      </p>
    </div>
  );
}
