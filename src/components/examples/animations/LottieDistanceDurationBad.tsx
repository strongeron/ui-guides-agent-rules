import { useState } from 'react';

const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

/** One "medium" duration token, spent on everything that moves. */
const DURATION_MD_MS = 200;

const TOOLTIP_TRAVEL_PX = 8;
const SHEET_TRAVEL_PX = 200;

/**
 * Bad: the tooltip travels 8px and the bottom sheet travels 200px, and both are
 * given the same `--duration-md: 200ms`. The tooltip crawls the last few pixels
 * of a journey the eye finished instantly; the sheet covers a quarter of the panel
 * in the same time and reads as a teleport.
 */
export function LottieDistanceDurationBad() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

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
      </div>

      <div className="relative h-56 overflow-hidden rounded-lg border border-border bg-muted/40">
        <div className="flex h-full items-start justify-center p-6">
          <div className="relative">
            <span
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-[11px] text-card-foreground shadow-sm"
              style={{
                transition: `transform ${DURATION_MD_MS}ms ${EASE}, opacity ${DURATION_MD_MS}ms ${EASE}`,
                transform: tooltipOpen
                  ? 'translate(-50%, 0)'
                  : `translate(-50%, ${TOOLTIP_TRAVEL_PX}px)`,
                opacity: tooltipOpen ? 1 : 0,
              }}
            >
              {TOOLTIP_TRAVEL_PX}px in {DURATION_MD_MS}ms
            </span>
            <span className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-card-foreground">
              Anchor
            </span>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 rounded-t-xl border-t border-border bg-card p-4"
          style={{
            height: SHEET_TRAVEL_PX,
            transition: `transform ${DURATION_MD_MS}ms ${EASE}`,
            transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
          }}
        >
          <p className="text-sm font-medium text-card-foreground">Bottom sheet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {SHEET_TRAVEL_PX}px in {DURATION_MD_MS}ms — 25× the distance, same duration.
          </p>
        </div>
      </div>

      <p className="text-xs text-destructive">
        One duration token for a 8px nudge and a 200px surface. The tooltip feels sluggish for what it is, and the
        sheet arrives faster than the eye can track it — the same number is wrong in both directions at once.
      </p>
    </div>
  );
}
