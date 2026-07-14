import { useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

const BASE_PX = 100;
const BASE_MS = 250; // a 100px journey
const MIN_MS = 140; // interaction-feedback floor: below this, motion stops reading as motion
const MAX_MS = 400; // ceiling: nothing on this surface may take longer

/**
 * Duration grows with travel distance, but sublinearly: 100px = 1x, 200px = 1.3x,
 * 400px = 1.6x. Doubling the distance must NOT double the duration, or long
 * journeys feel like wading. Clamp both ends so the formula cannot produce a
 * duration that is imperceptible or interminable.
 */
function durationFor(distancePx: number): number {
  const factor = 1 + 0.3 * Math.log2(Math.max(distancePx, 1) / BASE_PX);
  return Math.round(Math.min(MAX_MS, Math.max(MIN_MS, BASE_MS * factor)));
}

const TOOLTIP_TRAVEL_PX = 8;
const SHEET_TRAVEL_PX = 200;

const TOOLTIP_MS = durationFor(TOOLTIP_TRAVEL_PX);
const SHEET_MS = durationFor(SHEET_TRAVEL_PX);

/**
 * Good: same tooltip, same sheet, same easing — the only change is that each
 * duration is derived from how far the element actually travels. The tooltip snaps
 * across its 8px; the sheet takes long enough for the eye to follow 200px of
 * surface, which is exactly why drawers are the exception in a per-element budget.
 */
export function LottieDistanceDurationGood() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const reduced = useSimulatedReducedMotion();

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setTooltipOpen((v) => !v)}
          className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Toggle tooltip
        </button>
        <button
          onClick={() => setSheetOpen((v) => !v)}
          className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Toggle sheet
        </button>
        <ReducedMotionSwitch />
      </div>

      <div className="relative h-56 overflow-hidden rounded-lg border border-border bg-muted/40">
        <div className="flex h-full items-start justify-center p-6">
          <div className="relative">
            <span
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-[11px] text-card-foreground shadow-sm"
              style={
                reduced
                  ? {
                      transition: 'opacity 150ms linear',
                      transform: 'translate(-50%, 0)',
                      opacity: tooltipOpen ? 1 : 0,
                    }
                  : {
                      transition: `transform ${TOOLTIP_MS}ms ${EASE}, opacity ${TOOLTIP_MS}ms ${EASE}`,
                      transform: tooltipOpen
                        ? 'translate(-50%, 0)'
                        : `translate(-50%, ${TOOLTIP_TRAVEL_PX}px)`,
                      opacity: tooltipOpen ? 1 : 0,
                    }
              }
            >
              {TOOLTIP_TRAVEL_PX}px in {TOOLTIP_MS}ms
            </span>
            <span className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-card-foreground">
              Anchor
            </span>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 rounded-t-xl border-t border-border bg-card p-4"
          style={
            reduced
              ? {
                  height: SHEET_TRAVEL_PX,
                  transition: 'opacity 150ms linear',
                  transform: 'translateY(0)',
                  opacity: sheetOpen ? 1 : 0,
                  pointerEvents: sheetOpen ? undefined : 'none',
                }
              : {
                  height: SHEET_TRAVEL_PX,
                  transition: `transform ${SHEET_MS}ms ${EASE}`,
                  transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
                }
          }
        >
          <p className="text-sm font-medium text-card-foreground">Bottom sheet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {SHEET_TRAVEL_PX}px in {SHEET_MS}ms — 25× the distance, only {(SHEET_MS / TOOLTIP_MS).toFixed(1)}× the
            duration.
          </p>
        </div>
      </div>

      <p className="text-xs text-success">
        <code>durationFor(px)</code> scales sublinearly: 100px = 1×, 200px = 1.3×, 400px = 1.6×, clamped to 140–400ms.
        The tooltip lands in {TOOLTIP_MS}ms, the sheet in {SHEET_MS}ms — one rule, two right answers.
      </p>
    </div>
  );
}
