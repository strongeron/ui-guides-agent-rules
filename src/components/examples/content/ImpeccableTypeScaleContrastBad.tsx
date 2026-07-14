const STEPS = [
  { px: 20, weight: 600, text: 'Deployment overview' },
  { px: 18, weight: 600, text: 'Production build' },
  { px: 16, weight: 400, text: 'The last build finished 4 minutes ago.' },
  { px: 15, weight: 400, text: 'Triggered by a push to main.' },
  { px: 14, weight: 400, text: 'Region iad1 · 1.2s' },
];

const sizes = STEPS.map((s) => s.px);
const ratio = Math.max(...sizes) / Math.min(...sizes);

export function ImpeccableTypeScaleContrastBad() {
  return (
    <div className="space-y-3">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4">
        {STEPS.map((step) => (
          <p
            key={step.px}
            className="text-foreground"
            style={{ fontSize: `${step.px}px`, fontWeight: step.weight, lineHeight: 1.4 }}
          >
            {step.text}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          {sizes.length} sizes · {sizes.join(' / ')}px
        </span>
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          largest ÷ smallest = {ratio.toFixed(1)}:1
        </span>
      </div>

      <p className="text-xs text-error">
        Five sizes, but every step is only a pixel or two apart, so the whole block reads as one
        undifferentiated grey slab — squint at it and the heading disappears into the metadata. The
        detector flags 3 or more distinct sizes whose largest-to-smallest ratio is under 2.0: that
        is flat hierarchy. More sizes did not buy more structure; they only bought more decisions.
      </p>
    </div>
  );
}
