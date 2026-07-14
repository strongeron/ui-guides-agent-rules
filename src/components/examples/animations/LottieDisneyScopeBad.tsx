import { useEffect, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Bad: the full Disney recipe — anticipation, then overshoot, then a squash settle —
 * applied to a DROPDOWN. This is chrome the user operates dozens of times a day,
 * not a character they watch once. The control points of this curve leave the
 * [0, 1] band (y2 = 1.56), which is exactly what overshoot IS, and what
 * `animations-impeccable-no-bounce-easing` bans on this kind of surface.
 */
const BACK_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const ANTICIPATION_MS = 140;
const OPEN_MS = 420;

const ITEMS = ['Rename', 'Duplicate', 'Delete'];

export function LottieDisneyScopeBad() {
  const [run, setRun] = useState(0);
  // 'closed' -> 'anticipating' (wind-up: menu shrinks away first) -> 'open' (overshoots back)
  const [phase, setPhase] = useState<'closed' | 'anticipating' | 'open'>('closed');
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    if (run === 0) return;
    setPhase('closed');
    const t1 = setTimeout(() => setPhase('anticipating'), 20);
    const t2 = setTimeout(() => setPhase('open'), 20 + ANTICIPATION_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [run]);

  const menuStyle = reduced
    ? {
        opacity: phase === 'open' ? 1 : 0,
        transform: 'none',
        transition: 'opacity 150ms linear',
      }
    : {
        opacity: phase === 'closed' ? 0 : 1,
        // Anticipation: the menu pulls AWAY (scale 0.9, up 4px) before it opens.
        // Then it overshoots its final size on a back-ease and wobbles into place.
        transform:
          phase === 'closed'
            ? 'scale(0.92) translateY(-4px)'
            : phase === 'anticipating'
              ? 'scale(0.9) translateY(-6px)'
              : 'scale(1) translateY(0)',
        transformOrigin: 'top center',
        transition:
          phase === 'anticipating'
            ? `transform ${ANTICIPATION_MS}ms ease-in, opacity ${ANTICIPATION_MS}ms ease-in`
            : `transform ${OPEN_MS}ms ${BACK_EASE}, opacity 160ms ease-out`,
      };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay menu open
        </button>
        <ReducedMotionSwitch />
      </div>

      <div className="relative h-52 rounded-lg border border-border bg-muted/40 p-6">
        <div className="inline-block rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
          Actions ▾
        </div>

        <ul
          className="mt-2 w-44 space-y-1 rounded-lg border border-border bg-card p-2 shadow-lg"
          style={menuStyle}
          aria-hidden={phase !== 'open'}
        >
          {ITEMS.map((item) => (
            <li key={item} className="rounded-md px-2 py-1.5 text-xs text-card-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-destructive">
        The menu winds up backwards before it opens, then sails past its final size and springs back
        (cubic-bezier(0.34, 1.56, 0.64, 1) — y2 = 1.56 is the overshoot). Charming once; on the fiftieth open today it
        reads as dated, and as a control that is not quite sure where it belongs.
      </p>
    </div>
  );
}
