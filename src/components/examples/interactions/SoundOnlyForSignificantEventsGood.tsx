import { useState } from 'react';
import { playBlip } from '@/components/demo-kit/playBlip';

/**
 * Silence while typing. One blip on submit — a confirmation, which is exactly the
 * category the appropriateness matrix says earns a sound. Because it fires once per
 * task instead of once per character, it still means something when it fires.
 */
export function SoundOnlyForSignificantEventsGood() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [value, setValue] = useState('');
  const [keystrokes, setKeystrokes] = useState(0);
  const [blips, setBlips] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) playBlip();
    setBlips((n) => n + 1);
    setSubmitted(true); // Visual channel first — sound only ever supplements it.
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

        <form onSubmit={handleSubmit} className="rounded-md border border-border bg-muted p-4">
          <label htmlFor="quiet-input" className="block text-xs text-muted-foreground mb-1">
            Search
          </label>
          <input
            id="quiet-input"
            value={value}
            onChange={(e) => {
              // No sound here. Typing is high-frequency: the visual feedback is the character
              // appearing, and that is already instant and sufficient.
              setKeystrokes((n) => n + 1);
              setSubmitted(false);
              setValue(e.target.value);
            }}
            placeholder="Type a sentence here…"
            className="mb-3 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className={`w-full rounded-md px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
              submitted
                ? 'bg-success/15 text-success ring-1 ring-success'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {submitted ? '✓ Submitted' : 'Submit'}
          </button>
          <p role="status" aria-live="polite" className="mt-2 min-h-4 text-xs text-success">
            {submitted ? 'Search saved.' : ''}
          </p>
        </form>

        <p className="mt-3 text-xs text-muted-foreground">
          Type as much as you like — silence. Submit once — one blip. The matrix draws the line by
          frequency: payment success, form submission, errors and notifications get a sound; typing, hover,
          scroll and keyboard navigation never do.
        </p>

        <div className="mt-3 rounded-md border border-dashed border-border p-2">
          <p className="text-xs text-muted-foreground">Audio monitor — instrumentation, not product UI:</p>
          <p className="mt-1 text-xs font-mono text-success" aria-live="polite">
            {keystrokes} keystroke{keystrokes === 1 ? '' : 's'} → 0 blips ·{' '}
            {blips === 0
              ? 'no submissions yet'
              : `${blips} submission${blips > 1 ? 's' : ''} → ${blips} blip${blips > 1 ? 's' : ''} ${soundEnabled ? 'played' : 'suppressed (sound off)'}`}
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Silent while typing, one confirmation blip on submit — the sound still means something
      </p>
    </div>
  );
}
