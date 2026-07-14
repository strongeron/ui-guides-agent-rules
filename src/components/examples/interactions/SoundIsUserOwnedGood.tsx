import { useState } from 'react';
import { playBlip } from '@/components/demo-kit/playBlip';

// The upstream skill's own number: subtle, not loud.
const DEFAULT_VOLUME = 0.3;

/**
 * Three controls, all owned by the user: an explicit mute toggle, an in-app volume
 * independent of system volume, and a subtle default. Sound becomes a property of
 * the session rather than of the product.
 */
export function SoundIsUserOwnedGood() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [plays, setPlays] = useState(0);

  const notify = () => {
    if (soundEnabled) playBlip(volume);
    setPlays((n) => n + 1);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        {/* ---- the product UI: the sound controls ARE the product here ---- */}
        <div className="rounded-md border border-border bg-muted p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-foreground">Notifications</p>
            <span className="text-xs text-muted-foreground">Settings</span>
          </div>

          <label className="mb-3 flex items-center justify-between gap-2 text-xs text-foreground">
            <span>Notification sounds</span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <label
            htmlFor="sound-volume"
            className="mb-1 flex items-center justify-between text-xs text-foreground"
          >
            <span>Volume</span>
            <span className="font-mono text-muted-foreground">{volume.toFixed(2)}</span>
          </label>
          <input
            id="sound-volume"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            disabled={!soundEnabled}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mb-3 w-full accent-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          />

          <button
            onClick={notify}
            className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Trigger a notification
          </button>
        </div>
        {/* ---- end product UI ---- */}

        <p className="mt-3 text-xs text-muted-foreground">
          Off by default, so nothing ambushes anyone. Turn it on and it starts at{' '}
          <span className="font-mono text-foreground">{DEFAULT_VOLUME}</span> — the level the upstream skill
          recommends, quiet enough that the first sound a user hears is never the loudest thing they have
          heard today. The slider is independent of system volume: only the user knows what else is playing.
        </p>

        <div className="mt-3 rounded-md border border-dashed border-border p-2">
          <p className="text-xs text-muted-foreground">Audio monitor — instrumentation, not product UI:</p>
          <p className="mt-1 text-xs font-mono text-success" aria-live="polite">
            {plays === 0
              ? 'nothing played yet'
              : soundEnabled
                ? `${plays} chime${plays > 1 ? 's' : ''} played at volume ${volume.toFixed(2)}`
                : `${plays} chime${plays > 1 ? 's' : ''} suppressed — the user turned sounds off, in the app`}
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Mute toggle, independent volume, subtle 0.3 default — the user owns the channel
      </p>
    </div>
  );
}
