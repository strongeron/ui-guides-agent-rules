import { useState } from 'react';
import { playBlip } from '@/components/demo-kit/playBlip';

/**
 * The same 880Hz blip fires for a trivial star and for deleting an account. The audio
 * channel carries no hierarchy — the ear cannot tell the reversible from the grave.
 */
export function SoundWeightMatchesActionBad() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [last, setLast] = useState<string>('');

  const act = (label: string) => {
    if (soundEnabled) playBlip(); // identical sound regardless of consequence
    setLast(label);
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
            onClick={() => act('Starred')}
            className="flex-1 rounded-md bg-muted px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            ☆ Star
          </button>
          <button
            type="button"
            onClick={() => act('Account deleted')}
            className="flex-1 rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive ring-1 ring-destructive focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Delete account
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-3 min-h-4 text-xs text-muted-foreground">
          {last}
        </p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Same blip for both: the sound of starring is the sound of an irreversible delete.
      </p>
    </div>
  );
}
