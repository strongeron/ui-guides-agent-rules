import { useEffect, useState } from 'react';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

/**
 * Bad: the "Saved" confirmation is signalled with opacity alone. Peripheral vision
 * is poor at absolute luminance and good at movement, so a pill that simply
 * brightens in place — away from where the user is actually looking, which is the
 * button they just pressed — frequently never registers. They press Save again.
 */
export function LottieNeverOpacityOnlyBad() {
  const [saved, setSaved] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 1800);
    return () => clearTimeout(t);
  }, [saved, clicks]);

  return (
    <div className="w-full space-y-4">
      <p className="text-xs text-muted-foreground">
        Keep your eyes on the Save button. Did the corner change?
      </p>

      <div className="relative flex h-40 items-end rounded-lg border border-border bg-muted/40 p-4">
        {/* Opacity only. No transform, no aria-live. */}
        <span
          className="absolute right-4 top-4 rounded-full border border-border bg-card px-3 py-1 text-xs text-card-foreground"
          style={{
            transition: `opacity 220ms ${EASE}`,
            opacity: saved ? 1 : 0,
          }}
        >
          Saved
        </span>

        <button
          onClick={() => {
            setClicks((c) => c + 1);
            setSaved(true);
          }}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Save
        </button>
        <span className="ml-3 text-xs tabular-nums text-muted-foreground">
          Save pressed <strong className="text-destructive">{clicks}×</strong>
        </span>
      </div>

      <p className="text-xs text-destructive">
        A pure luminance change is nearly invisible off-axis, and there is no{' '}
        <code>aria-live</code> region either — so neither a sighted user glancing at the button nor a screen reader
        user is told the save landed. Both respond the same way: press Save again.
      </p>
    </div>
  );
}
