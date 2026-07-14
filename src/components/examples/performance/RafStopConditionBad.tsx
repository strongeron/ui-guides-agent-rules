import { useEffect, useRef, useState } from 'react';

/**
 * BAD: a rAF loop that re-schedules itself unconditionally.
 * It is correct for the ~40 frames the value takes to settle, and wrong for every
 * frame after that — it keeps waking up 60 times a second to compute a delta of zero.
 * There is no cancelAnimationFrame in the cleanup either, so it also outlives unmount.
 */
export function RafStopConditionBad() {
  const [value, setValue] = useState(0);
  const [frames, setFrames] = useState(0);
  const frameCount = useRef(0);

  useEffect(() => {
    let current = 0;

    const tick = () => {
      current += (100 - current) * 0.08;
      frameCount.current += 1;
      setValue(current);
      setFrames(frameCount.current);

      // Demo guard only, so this page does not drain your battery.
      // The real bug has no guard: it re-schedules forever.
      if (frameCount.current > 1800) return;

      requestAnimationFrame(tick); // no stop condition
    };

    requestAnimationFrame(tick);
    // no cleanup: nothing cancels this loop when the component unmounts
  }, []);

  const settled = Math.abs(100 - value) < 0.5;

  return (
    <div className="space-y-3">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>

      <dl className="flex gap-6 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Frames rendered</dt>
          <dd className="font-mono tabular-nums text-foreground">{frames}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Animation state</dt>
          <dd className="font-mono text-foreground">{settled ? 'settled' : 'animating'}</dd>
        </div>
      </dl>

      <p className="text-xs text-destructive">
        The bar reached 100% seconds ago and the counter is still climbing. That is a core held at ~60Hz
        for nothing — the usual explanation for an idle tab sitting at 12% CPU.
      </p>
    </div>
  );
}
