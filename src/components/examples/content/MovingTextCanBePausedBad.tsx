export function MovingTextCanBePausedBad() {
  const items = '⚡ 40% off ends tonight · Free shipping over $50 · New arrivals just dropped · ';
  return (
    <div className="w-full max-w-sm py-6">
      <style>{`@keyframes uig-ticker-bad{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div className="overflow-hidden rounded-md border border-border bg-card py-2">
        {/* Auto-scrolls forever, no control, no reduced-motion escape. */}
        <div
          className="whitespace-nowrap text-sm text-foreground"
          style={{ animation: 'uig-ticker-bad 8s linear infinite' }}
        >
          {items}
          {items}
        </div>
      </div>
      <p className="mt-4 text-xs text-destructive">
        The ticker never stops and has no pause — it fails WCAG 2.2.2, and reduced-motion users get no relief.
      </p>
    </div>
  );
}
