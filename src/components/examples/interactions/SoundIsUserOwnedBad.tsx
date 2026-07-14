import { useState } from 'react';
import { playBlip } from '@/components/demo-kit/playBlip';

// Hardcoded, full blast, no way to change it.
const DEFAULT_VOLUME = 1.0;

/**
 * A sound provider with no off switch and no volume. Audio is treated as a property
 * of the product rather than of the session, so the user's only recourse is the OS
 * mixer — which silences everything, not just this app.
 */
export function SoundIsUserOwnedBad() {
  const [demoAudioAllowed, setDemoAudioAllowed] = useState(false);
  const [plays, setPlays] = useState(0);

  const notify = () => {
    // No `if (soundEnabled)`. No `audio.volume = userVolume`. There is nothing to check.
    if (demoAudioAllowed) playBlip(DEFAULT_VOLUME);
    setPlays((n) => n + 1);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <label className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={demoAudioAllowed}
            onChange={(e) => setDemoAudioAllowed(e.target.checked)}
            className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          Let this demo make sound (off by default — this switch belongs to the guide, not to the app below)
        </label>

        {/* ---- the product UI ---- */}
        <div className="rounded-md border border-border bg-muted p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-foreground">Notifications</p>
            <span className="text-xs text-muted-foreground">Settings</span>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Email digest, mentions, replies… and no sound preferences of any kind. Not a mute switch, not a
            volume. The chime is whatever we decided it is.
          </p>
          <button
            onClick={notify}
            className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Trigger a notification
          </button>
        </div>
        {/* ---- end product UI ---- */}

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">volume</dt>
            <dd className="font-mono text-destructive">{DEFAULT_VOLUME.toFixed(1)} — hardcoded</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">mute control</dt>
            <dd className="font-mono text-destructive">none</dd>
          </div>
        </dl>

        <div className="mt-3 rounded-md border border-dashed border-border p-2">
          <p className="text-xs text-muted-foreground">Audio monitor — instrumentation, not product UI:</p>
          <p className="mt-1 text-xs font-mono text-destructive" aria-live="polite">
            {plays === 0
              ? 'nothing played yet'
              : `${plays} chime${plays > 1 ? 's' : ''} at volume 1.0 ${demoAudioAllowed ? 'played' : 'suppressed by the guide, not by the app'} — the app offers no way to stop them`}
          </p>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        No mute, no volume, hardcoded 1.0 — the user&apos;s only escape is silencing their whole machine
      </p>
    </div>
  );
}
