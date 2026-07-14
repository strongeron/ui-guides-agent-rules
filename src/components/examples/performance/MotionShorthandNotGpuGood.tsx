import { useRef, useState } from 'react';
import { motion } from 'motion/react';

const DISTANCE = 200;
const BLOCK_MS = 600;

const blockMainThread = (ms: number) => {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    // spin: identical long task to the bad example, so the comparison is fair
  }
};

export function MotionShorthandNotGpuGood() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [moved, setMoved] = useState<number | null>(null);

  const stress = () => {
    const box = boxRef.current;
    if (!box) return;
    const before = box.getBoundingClientRect().left;
    blockMainThread(BLOCK_MS);
    const after = box.getBoundingClientRect().left;
    let delta = after - before;
    if (delta < -1) delta += DISTANCE; // the loop wrapped mid-block
    setMoved(Math.round(delta));
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="text-xs text-muted-foreground">
          <code>
            animate={'{{'} transform: &apos;translateX({DISTANCE}px)&apos; {'}}'}
          </code>
        </div>
        <div className="h-10 overflow-hidden rounded-md bg-muted">
          <motion.div
            ref={boxRef}
            initial={{ transform: 'translateX(0px)' }}
            animate={{ transform: `translateX(${DISTANCE}px)` }}
            transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
            className="size-10 rounded-md bg-primary"
          />
        </div>

        <button
          type="button"
          onClick={stress}
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground"
        >
          Block the main thread for {BLOCK_MS}ms
        </button>

        <div className="text-xs tabular-nums text-success">
          moved during the block: {moved === null ? '—' : `${moved} px`}
        </div>
      </div>
      <p className="text-xs text-success">
        A full <code>transform</code> string is on Motion&apos;s accelerated list, so it is handed to
        the Web Animations API and ticked by the compositor. Block the main thread for the same{' '}
        {BLOCK_MS}ms and the box keeps travelling — the measured distance is a real number, not zero.
        Same library, same duration, one of them survives a busy thread.
      </p>
    </div>
  );
}
