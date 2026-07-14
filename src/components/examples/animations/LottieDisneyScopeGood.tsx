import { useEffect, useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

/**
 * Good: the SAME two Disney techniques, sorted by what the object is.
 *
 *  - The dropdown is CHROME the user operates dozens of times a day. Corporate
 *    budget: 0% overshoot, plain ease-out, 150ms. No anticipation (LottieFiles
 *    itself says "Skip for micro-feedback (<150ms)").
 *  - The success character is a CHARACTER the user watches, once. It gets the full
 *    recipe — anticipation, overshoot, follow-through — and that is where the
 *    charm actually lands.
 *
 * Same page, same product, two different motion budgets, on purpose.
 */
const UI_EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'; // strong ease-out, stays inside [0,1]
const BACK_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // overshoot — reserved for the character
const MENU_MS = 150;
const ANTICIPATION_MS = 160;
const POP_MS = 420;

const ITEMS = ['Rename', 'Duplicate', 'Delete'];

export function LottieDisneyScopeGood() {
  const [run, setRun] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [charPhase, setCharPhase] = useState<'hidden' | 'anticipating' | 'popped'>('hidden');
  const reduced = useSimulatedReducedMotion();

  useEffect(() => {
    if (run === 0) return;
    setMenuOpen(false);
    setCharPhase('hidden');

    // Chrome: opens immediately, no wind-up.
    const t1 = setTimeout(() => setMenuOpen(true), 20);
    // Character: gathers, then bursts. It is allowed to take its time.
    const t2 = setTimeout(() => setCharPhase('anticipating'), 400);
    const t3 = setTimeout(() => setCharPhase('popped'), 400 + ANTICIPATION_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [run]);

  // ── Chrome: flat ease-out, no overshoot, no anticipation. ──
  const menuStyle = reduced
    ? { opacity: menuOpen ? 1 : 0, transform: 'none', transition: 'opacity 150ms linear' }
    : {
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? 'scale(1) translateY(0)' : 'scale(0.98) translateY(-4px)',
        transformOrigin: 'top center',
        transition: `transform ${MENU_MS}ms ${UI_EASE}, opacity ${MENU_MS}ms ${UI_EASE}`,
      };

  // ── Character: anticipation (compress) → overshoot pop → settle. ──
  const characterStyle = reduced
    ? {
        opacity: charPhase === 'popped' ? 1 : 0,
        transform: 'none',
        transition: 'opacity 150ms linear',
      }
    : {
        opacity: charPhase === 'hidden' ? 0 : 1,
        transform:
          charPhase === 'hidden'
            ? 'scale(0.6)'
            : charPhase === 'anticipating'
              ? 'scale(0.82)' // wind-up: gathers before it bursts
              : 'scale(1)',
        transition:
          charPhase === 'anticipating'
            ? `transform ${ANTICIPATION_MS}ms ease-in, opacity ${ANTICIPATION_MS}ms ease-in`
            : `transform ${POP_MS}ms ${BACK_EASE}, opacity 160ms ease-out`,
      };

  // Follow-through: the ring trails the character out and fades.
  const ringStyle =
    reduced || charPhase !== 'popped'
      ? { opacity: 0, transform: 'scale(0.8)' }
      : {
          opacity: 0,
          transform: 'scale(1.7)',
          transition: `transform 520ms ${UI_EASE} 60ms, opacity 520ms ${UI_EASE} 60ms`,
        };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setRun((r) => r + 1)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Replay both
        </button>
        <ReducedMotionSwitch />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* CONTROL — no overshoot. */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="mb-3 text-xs font-medium text-muted-foreground">Control — 0% overshoot</p>
          <div className="h-40">
            <div className="inline-block rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
              Actions ▾
            </div>
            <ul
              className="mt-2 w-40 space-y-1 rounded-lg border border-border bg-card p-2 shadow-lg"
              style={menuStyle}
              aria-hidden={!menuOpen}
            >
              {ITEMS.map((item) => (
                <li key={item} className="rounded-md px-2 py-1.5 text-xs text-card-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CHARACTER — the full recipe, once. */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="mb-3 text-xs font-medium text-muted-foreground">Character — anticipate, overshoot, follow through</p>
          <div className="flex h-40 items-center justify-center">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2 border-success"
                style={ringStyle}
              />
              <div
                className="relative flex size-16 items-center justify-center rounded-full bg-success text-2xl text-success-foreground"
                style={characterStyle}
                role="img"
                aria-label="Upload complete"
              >
                ✓
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-success">
        Same product, two budgets. The menu the user opens fifty times a day gets a flat 150ms ease-out that stays out of
        the way. The celebration they see once gets the wind-up, the overshoot and the trailing ring — because it is a
        character, not a control. Reduced motion keeps both end states and drops the travel.
      </p>
    </div>
  );
}
