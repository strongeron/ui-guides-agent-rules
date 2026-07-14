type Rgb = [number, number, number];

const WHITE: Rgb = [255, 255, 255];
const BANDS: { name: string; fill: Rgb }[] = [
  { name: 'Surface 1', fill: [39, 39, 42] },
  { name: 'Surface 2', fill: [113, 113, 122] },
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

// What the browser actually composites: 60% white over the band underneath.
const flatten = (fg: Rgb, bg: Rgb, alpha: number): Rgb =>
  fg.map((c, i) => Math.round(c * alpha + bg[i] * (1 - alpha))) as Rgb;

export function ImpeccableAlphaSmellBad() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        One label token: <code>text-white/60</code>, reused on both surfaces.
      </p>

      <div className="overflow-hidden rounded-lg border border-border">
        {BANDS.map((band) => {
          const ratio = contrast(flatten(WHITE, band.fill, 0.6), band.fill);
          const passes = ratio >= 4.5;
          return (
            <div
              key={band.name}
              className="flex items-center justify-between px-4 py-5"
              style={{ background: css(band.fill) }}
            >
              <span className="text-sm font-medium text-white/60">Last synced 4 minutes ago</span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-semibold ${
                  passes ? 'bg-white text-black' : 'bg-red-600 text-white'
                }`}
              >
                {ratio.toFixed(2)}:1 · {passes ? 'AA pass' : 'AA fail'}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-error">
        The same token, two verdicts. A translucent color has no fixed value — the browser flattens it
        against whatever sits behind, so the contrast ratio is a property of the backdrop, not of the
        token. It quietly fails the moment the component moves to another surface.
      </p>
    </div>
  );
}
