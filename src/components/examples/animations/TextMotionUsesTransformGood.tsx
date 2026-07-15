export function TextMotionUsesTransformGood() {
  return (
    <div className="w-full max-w-sm py-6">
      <style>{`@keyframes uig-metric-good{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
        @media (prefers-reduced-motion: reduce){.uig-metric-good{animation:none}}`}</style>
      <p className="text-base leading-relaxed text-foreground">
        Our{' '}
        {/* Scaling with transform is compositor-only — no relayout, neighbours stay put. */}
        <span
          className="uig-metric-good font-semibold text-primary"
          style={{ animation: 'uig-metric-good 1.6s ease-in-out infinite', display: 'inline-block', transformOrigin: 'center' }}
        >
          biggest
        </span>{' '}
        sale of the year is finally here.
      </p>
      <p className="mt-4 text-xs text-success">
        Scaling with transform runs on the compositor: the word pulses without relayout, so the rest of the line never moves.
      </p>
    </div>
  );
}
