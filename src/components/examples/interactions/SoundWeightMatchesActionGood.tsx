import { useState } from 'react';
import { playTone } from '@/components/demo-kit/playBlip';

/**
 * Sound scaled to consequence. A light action gets a short, high, quiet tick; a heavy,
 * irreversible one gets a low, longer, weightier tone that glides down. The ear now
 * ranks the two before the label is even read.
 */
export function SoundWeightMatchesActionGood() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [last, setLast] = useState<string>('');

  const starred = () => {
    if (soundEnabled) playTone({ frequency: 1046, duration: 0.09, volume: 0.22 });
    setLast('Starred');
  };
  const deleted = () => {
    // Low, longer, a touch louder, with a downward glide — audibly heavier.
    if (soundEnabled) playTone({ frequency: 220, endFrequency: 150, duration: 0.34, type: 'triangle', volume: 0.34 });
    setLast('Account deleted');
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

        <div className="flex gap-2">
          <button
            type="button"
            onClick={starred}
            className="flex-1 rounded-md bg-muted px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            ☆ Star
          </button>
          <button
            type="button"
            onClick={deleted}
            className="flex-1 rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive ring-1 ring-destructive focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Delete account
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-4 text-xs text-muted-foreground">
          {last}
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        Light tick for the star, low weighty tone for the delete — the sound encodes the stakes.
      </p>
    </div>
  );
}
