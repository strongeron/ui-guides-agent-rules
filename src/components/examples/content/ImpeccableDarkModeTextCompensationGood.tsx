const COPY =
  'Light glyphs on a dark field bloom: the bright strokes spill into the surrounding dark and read heavier and tighter than the identical type inverted. Compensate on all three axes and the two panels finally look like the same typeface.';

/**
 * Compensation is applied to whichever panel is currently light-on-dark.
 * Panel A is the page surface, so it is light-on-dark only in the dark theme (dark: variants).
 * Panel B is inverted, so it is light-on-dark only in the light theme (base classes).
 */
const PANEL_A_TYPE =
  'leading-[1.5] tracking-normal font-normal dark:leading-[1.58] dark:tracking-[0.015em] dark:font-medium';
const PANEL_B_TYPE =
  'leading-[1.58] tracking-[0.015em] font-medium dark:leading-[1.5] dark:tracking-normal dark:font-normal';

export function ImpeccableDarkModeTextCompensationGood() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Panel A: the page surface */}
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="mb-2 text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            <span className="dark:hidden">Dark text on light</span>
            <span className="hidden dark:inline">Light text on dark (compensated)</span>
          </p>
          <p className={`text-sm text-card-foreground ${PANEL_A_TYPE}`}>{COPY}</p>
        </div>

        {/* Panel B: the inverted surface */}
        <div className="rounded-lg border border-border bg-foreground p-3">
          <p className="mb-2 text-[0.6875rem] uppercase tracking-[0.08em] text-background/70">
            <span className="dark:hidden">Light text on dark (compensated)</span>
            <span className="hidden dark:inline">Dark text on light</span>
          </p>
          <p className={`text-sm text-background ${PANEL_B_TYPE}`}>{COPY}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          dark-on-light: 1.5 / 0em / 400
        </span>
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          light-on-dark: 1.58 / 0.015em / 500
        </span>
      </div>

      <p className="text-xs text-success">
        Three axes, not one. The bloom makes light-on-dark read tighter, so line-height goes up 0.08
        (impeccable&rsquo;s 0.05 to 0.1 range) and letter-spacing gains 0.015em (0.01 to 0.02em) to give
        the glyphs back the air they lost. The optional third step takes body weight from 400 to 500
        so the strokes hold their shape against the dark ground. Both panels now read as the same
        typeface at the same density; fix only one axis and the block still feels subtly off without
        telling you why.
      </p>
    </div>
  );
}
