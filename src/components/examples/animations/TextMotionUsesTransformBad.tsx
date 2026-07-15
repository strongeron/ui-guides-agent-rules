export function TextMotionUsesTransformBad() {
  return (
    <div className="w-full max-w-sm py-6">
      <style>{`@keyframes uig-metric-bad{0%,100%{letter-spacing:normal}50%{letter-spacing:0.2em}}
        @media (prefers-reduced-motion: reduce){.uig-metric-bad{animation:none}}`}</style>
      <p className="text-base leading-relaxed text-foreground">
        Our{' '}
        {/* Animating letter-spacing (a text metric) resizes the word every frame. */}
        <span
          className="uig-metric-bad font-semibold"
          style={{ animation: 'uig-metric-bad 1.6s ease-in-out infinite', display: 'inline-block' }}
        >
          biggest
        </span>{' '}
        sale of the year is finally here.
      </p>
      <p className="mt-4 text-xs text-destructive">
        Animating letter-spacing changes the word’s width every frame, so the whole line relayouts and the neighbouring words twitch.
      </p>
    </div>
  );
}
