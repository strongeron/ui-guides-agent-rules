import { useRef, useState } from 'react';
import { motion } from 'motion/react';

const DISTANCE = 200;
const BLOCK_MS = 600;

const blockMainThread = (ms: number) => {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    // spin: a long task, exactly like a big JSON parse or a layout-heavy render
  }
};

export function MotionShorthandNotGpuBad() {
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
          <code>animate={'{{'} x: {DISTANCE} {'}}'}</code>
        </div>
        <div className="h-10 overflow-hidden rounded-md bg-muted">
          <motion.div
            ref={boxRef}
            initial={{ x: 0 }}
            animate={{ x: DISTANCE }}
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

        <div className="text-xs tabular-nums text-error">
          moved during the block: {moved === null ? '—' : `${moved} px`}
        </div>
      </div>
      <p className="text-xs text-error">
        The <code>x</code> shorthand is a Motion value written on every{' '}
        <code>requestAnimationFrame</code> tick — main-thread work wearing a{' '}
        <code>transform</code> costume. Block the thread and the box measurably stops: the distance
        it covered during the block is around zero, and it resumes from where it froze.
      </p>
    </div>
  );
}
