export function ReducedTransparencyContrastBad() {
  return (
    <div className="space-y-3">
      <style>{`
        .rtcb-bar {
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
        }
      `}</style>

      <div className="relative h-56 overflow-hidden rounded-lg border border-border">
        {/* Busy content scrolling under the chrome — i.e. the toolbar's real backdrop. */}
        <div className="h-full overflow-y-auto bg-gradient-to-br from-sky-200 via-fuchsia-300 to-amber-200 p-4 pt-16">
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="mb-3 text-sm font-medium text-slate-900">
              Row {i + 1} — the toolbar&apos;s effective contrast is whatever happens to be underneath it
              at this exact scroll position.
            </p>
          ))}
        </div>

        <div className="rtcb-bar absolute inset-x-0 top-0 flex items-center justify-between bg-white/40 px-4 py-3">
          <span className="text-sm font-semibold text-slate-900">Library</span>
          <span className="text-xs text-slate-700">248 items</span>
        </div>
      </div>

      <p className="text-xs text-destructive">
        The toolbar is glass, and it stays glass no matter what the reader has asked their OS for. Turn on
        &ldquo;Reduce transparency&rdquo; (macOS/iOS) or &ldquo;Increase contrast&rdquo; and nothing here
        changes: the label still floats over a shifting backdrop whose contrast cannot be measured,
        because the effective colour behind the text is decided by the scroll position. Neither{' '}
        <code>prefers-reduced-transparency</code> nor <code>prefers-contrast</code> is honoured — the
        only motion/appearance preference this UI has ever heard of is{' '}
        <code>prefers-reduced-motion</code>.
      </p>
    </div>
  );
}
