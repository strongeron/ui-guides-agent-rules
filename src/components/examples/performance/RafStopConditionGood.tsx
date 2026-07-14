import { useEffect, useRef, useState } from 'react';

/**
 * GOOD: two exits. A terminal condition (the value converged) stops the loop from
 * re-scheduling, and cancelAnimationFrame in the effect teardown kills any in-flight
 * frame if the component unmounts mid-animation.
 */
export function RafStopConditionGood() {
  const [value, setValue] = useState(0);
  const [frames, setFrames] = useState(0);
  const frameCount = useRef(0);

  useEffect(() => {
    let current = 0;
    let handle = 0;

    const tick = () => {
      current += (100 - current) * 0.08;
      frameCount.current += 1;
      setValue(current);
      setFrames(frameCount.current);

      // Stop condition: converged, so there is nothing left to draw.
      if (Math.abs(100 - current) < 0.5) {
        setValue(100);
        return;
      }

      handle = requestAnimationFrame(tick);
    };

    handle = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(handle); // no orphan loop after unmount
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
          <dd className="font-mono text-foreground">{settled ? 'stopped' : 'animating'}</dd>
        </div>
      </dl>

      <p className="text-xs text-success">
        The counter freezes the moment the value converges: the loop paid for exactly the frames it needed
        and then gave the CPU back. Cleanup cancels the pending frame, so unmounting mid-animation leaks nothing.
      </p>
    </div>
  );
}
