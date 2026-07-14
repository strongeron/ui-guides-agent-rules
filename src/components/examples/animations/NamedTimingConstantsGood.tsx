import { useEffect, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

const ROWS = ['Latency', 'Errors', 'Throughput'];

/**
 * Every value that affects timing or appearance is a named constant, in one block,
 * trivially adjustable. Read this and you have read the choreography.
 */
const TIMING = {
  cardAppear: 300,
  heading: 900,
  rows: 1500,
  duration: 260,
  rowStagger: 120,
  ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
} as const;

/** Stage 0 = nothing, 1 = card, 2 = heading, 3 = rows. One integer, not three booleans. */
const CUES = [TIMING.cardAppear, TIMING.heading, TIMING.rows];

/**
 * Good: the identical sequence, driven by a single `stage` integer and a single
 * TIMING block. The JSX reads `stage >= 2 ? ... : ...`, so the order is legible at a
 * glance and impossible to desync — retuning the whole sequence means editing one
 * object, and the tempo multiplier lands on every cue because there is only one
 * place for it to land.
 *
 * Related to but distinct from motion cohesion: that rule is about one motion
 * vocabulary across the product. This one is about one sequence being readable.
 */
export function NamedTimingConstantsGood() {
  const [run, setRun] = useState(0);
  const [tempo, setTempo] = useState(1);
  const [stage, setStage] = useState(0);
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    setStage(0);
    const timers = CUES.map((ms, i) => setTimeout(() => setStage(i + 1), ms * tempo));
    return () => timers.forEach(clearTimeout);
  }, [run, tempo]);

  const cardStyle = reduced
    ? { transition: `opacity 150ms linear`, transform: 'none', opacity: stage >= 1 ? 1 : 0 }
    : {
        transition: `transform ${TIMING.duration}ms ${TIMING.ease}, opacity ${TIMING.duration}ms ${TIMING.ease}`,
        transform: stage >= 1 ? 'translateY(0)' : 'translateY(12px)',
        opacity: stage >= 1 ? 1 : 0,
      };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay sequence
        </button>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Tempo
          <select
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 text-xs text-card-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value={1}>1×</option>
            <option value={0.5}>0.5×</option>
          </select>
        </label>
        <ReducedMotionSwitch />
        <span className="text-xs tabular-nums text-muted-foreground">
          stage: <strong className="text-foreground">{stage}</strong>/3
        </span>
      </div>

      <div className="h-44 rounded-lg border border-border bg-muted/40 p-4">
        <div className="rounded-lg border border-border bg-card p-4" style={cardStyle}>
          <p
            className="text-sm font-medium text-card-foreground"
            style={{
              transition: `opacity ${TIMING.duration}ms ${TIMING.ease}`,
              opacity: stage >= 2 ? 1 : 0,
            }}
          >
            Service health
          </p>
          <ul className="mt-3 space-y-1.5">
            {ROWS.map((row, i) => (
              <li
                key={row}
                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                style={{
                  transition: `opacity ${TIMING.duration}ms ${TIMING.ease}`,
                  transitionDelay: `${i * TIMING.rowStagger}ms`,
                  opacity: stage >= 3 ? 1 : 0,
                }}
              >
                {row}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-xs text-success">
        One <code>TIMING</code> block, one <code>stage</code> integer. The tempo multiplier hits every cue because
        there is only one list of cues, so 0.5× keeps the order intact — and the sequence can be retuned without
        reading the JSX at all.
      </p>
    </div>
  );
}
