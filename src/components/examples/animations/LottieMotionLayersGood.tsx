import { useEffect, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

const ROWS = ['Deploy · 2m ago', 'Build · 5m ago', 'Tests · 8m ago'];
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

/** Primary lands in 320ms; the shadow follows it in 50ms later; contents arrive 100ms after it lands. */
const PRIMARY_MS = 320;
const SHADOW_DELAY_MS = 50;
const CONTENT_DELAY_MS = PRIMARY_MS + 100;
const ROW_STAGGER_MS = 60;

/**
 * Good: the same card entrance, now built in three layers.
 *  - Primary   — the card rises and fades. This is the thing the eye follows.
 *  - Secondary — the shadow deepens 50ms behind the card (so it settles onto the
 *    surface instead of riding along), and the rows fade in 100ms after it lands.
 *  - Ambient   — a very low-amplitude background drift, so the scene is not dead.
 *
 * The shadow is a separate opacity-animated layer, not an animated box-shadow —
 * the depth cue is bought on the compositor, not in paint.
 */
export function LottieMotionLayersGood() {
  const [run, setRun] = useState(0);
  const [entered, setEntered] = useState(false);
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    setEntered(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [run]);

  // Reduced motion keeps every layer's END state and drops the travel.
  const primary = reduced
    ? { transition: 'opacity 150ms linear', transform: 'none', opacity: entered ? 1 : 0 }
    : {
        transition: `transform ${PRIMARY_MS}ms ${EASE}, opacity ${PRIMARY_MS}ms ${EASE}`,
        transform: entered ? 'translateY(0)' : 'translateY(20px)',
        opacity: entered ? 1 : 0,
      };

  const shadow = reduced
    ? { opacity: entered ? 1 : 0, transition: 'opacity 150ms linear' }
    : {
        transition: `opacity ${PRIMARY_MS}ms ${EASE} ${SHADOW_DELAY_MS}ms`,
        opacity: entered ? 1 : 0,
      };

  const ambient = reduced
    ? { transform: 'none' }
    : {
        transition: 'transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: entered ? 'translate(6px, -4px)' : 'translate(-6px, 4px)',
      };

  const rowStyle = (i: number) =>
    reduced
      ? { opacity: entered ? 1 : 0, transition: 'opacity 150ms linear' }
      : {
          transition: `transform 220ms ${EASE} ${CONTENT_DELAY_MS + i * ROW_STAGGER_MS}ms, opacity 220ms ${EASE} ${
            CONTENT_DELAY_MS + i * ROW_STAGGER_MS
          }ms`,
          transform: entered ? 'translateY(0)' : 'translateY(4px)',
          opacity: entered ? 1 : 0,
        };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay entrance
        </button>
        <ReducedMotionSwitch />
      </div>

      <div className="relative h-52 overflow-hidden rounded-lg border border-border bg-muted/40 p-6">
        {/* Ambient: background life, low enough amplitude that you notice its absence, not its presence. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-primary/10 blur-2xl"
          style={ambient}
        />

        <div className="relative" style={primary}>
          {/* Secondary: the shadow is its own layer, so it can lag the card. */}
          <div aria-hidden="true" className="absolute inset-0 rounded-lg shadow-lg" style={shadow} />
          <div className="relative rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium text-card-foreground">Pipeline</p>
            {/* Secondary: contents arrive after the card has landed. */}
            <ul className="mt-3 space-y-1.5">
              {ROWS.map((row, i) => (
                <li
                  key={row}
                  className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                  style={rowStyle(i)}
                >
                  {row}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="text-xs text-success">
        Three layers: the card rises (primary), the shadow deepens 50ms behind it and the rows fade in 100ms after it
        lands (secondary), the background drifts a few pixels (ambient). Reserve this for a rare hero moment — reduced
        motion keeps every end state and drops the travel.
      </p>
    </div>
  );
}
