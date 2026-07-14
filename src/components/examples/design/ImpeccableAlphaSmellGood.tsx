type Rgb = [number, number, number];

// Two explicit, opaque label tokens — one per surface, each measured against its own background.
const BANDS: { name: string; surface: Rgb; label: Rgb; token: string }[] = [
  { name: 'Surface 1', surface: [39, 39, 42], label: [212, 212, 216], token: '--text-on-surface-1' },
  { name: 'Surface 2', surface: [113, 113, 122], label: [255, 255, 255], token: '--text-on-surface-2' },
];

const css = (c: Rgb) => `rgb(${c[0]} ${c[1]} ${c[2]})`;

const toLinear = (channel: number) => {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: Rgb) =>
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

export function ImpeccableAlphaSmellGood() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Two opaque label tokens, one per surface — no alpha in the palette.
      </p>

      <div className="overflow-hidden rounded-lg border border-border">
        {BANDS.map((band) => {
          const ratio = contrast(band.label, band.surface);
          return (
            <div
              key={band.name}
              className="flex items-center justify-between px-4 py-5"
              style={{ background: css(band.surface), color: css(band.label) }}
            >
              <span className="text-sm font-medium">
                Last synced 4 minutes ago
                <code className="ml-2 text-xs opacity-90">{band.token}</code>
              </span>
              <span className="rounded bg-black px-2 py-0.5 text-xs font-semibold text-white">
                {ratio.toFixed(2)}:1 · AA pass
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-success">
        Each token is a fixed color, so its contrast is a number you can test in CI and it cannot drift
        when the component is reused. Alpha still earns its place in focus rings and hover/pressed states,
        where the effect is transient and never carries text.
      </p>
    </div>
  );
}
