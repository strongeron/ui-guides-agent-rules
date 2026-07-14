// A 1.333 (perfect fourth) scale from a 16px base: 12 / 16 / 21 / 28 / 37
const STEPS = [
  { px: 37, weight: 600, text: 'Deployment overview' },
  { px: 21, weight: 600, text: 'Production build' },
  { px: 16, weight: 400, text: 'The last build finished 4 minutes ago.' },
  { px: 16, weight: 400, text: 'Triggered by a push to main.' },
  { px: 12, weight: 400, text: 'Region iad1 · 1.2s' },
];

const sizes = [...new Set(STEPS.map((s) => s.px))];
const ratio = Math.max(...sizes) / Math.min(...sizes);

export function ImpeccableTypeScaleContrastGood() {
  return (
    <div className="space-y-3">
      <div className="space-y-2 rounded-lg border border-border bg-card p-4">
        {STEPS.map((step, i) => (
          <p
            key={i}
            className={step.px === 12 ? 'text-muted-foreground' : 'text-foreground'}
            style={{ fontSize: `${step.px}px`, fontWeight: step.weight, lineHeight: 1.4 }}
          >
            {step.text}
          </p>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          {sizes.length} sizes · 12 / 16 / 21 / 28 / 37px (ratio 1.333)
        </span>
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          largest ÷ smallest = {ratio.toFixed(1)}:1
        </span>
      </div>

      <p className="text-xs text-success">
        One ratio (1.333, a perfect fourth) generates every step, and the two body lines share a
        single size instead of inventing a new one. Squint: the heading, the section, the body, and
        the metadata separate instantly. Pick one ratio — 1.25 (major third), 1.333, or 1.5 — and
        five steps will cover nearly any interface.
      </p>
    </div>
  );
}
