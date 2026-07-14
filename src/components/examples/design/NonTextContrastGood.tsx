import { useCallback, useEffect, useRef, useState } from 'react';

type Rgb = [number, number, number];
type Prop = 'borderTopColor' | 'backgroundColor' | 'color';

/**
 * Paint the color over its backdrop on a 1x1 canvas: alpha, oklch and any other
 * computed color format all come back as real sRGB bytes, already composited.
 */
function resolve(color: string, backdrop: string): Rgb | null {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.fillStyle = backdrop;
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return [data[0], data[1], data[2]];
}

/** WCAG relative luminance (sRGB). */
function luminance([r, g, b]: Rgb): number {
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(fg: Rgb, bg: Rgb): number {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

const TRANSPARENT = /^(transparent$|rgba?\([^)]*[,/]\s*0(\.0+)?\s*\)$)/;

function backdropOf(el: Element, includeSelf: boolean): string {
  let node: Element | null = includeSelf ? el : el.parentElement;
  while (node) {
    const bg = window.getComputedStyle(node).backgroundColor;
    if (bg && !TRANSPARENT.test(bg)) return bg;
    node = node.parentElement;
  }
  return 'white';
}

function measure(el: Element | null, prop: Prop): number | null {
  if (!el) return null;
  const backdrop = backdropOf(el, prop !== 'backgroundColor');
  const fg = resolve(window.getComputedStyle(el)[prop], backdrop);
  const bg = resolve(backdrop, backdrop);
  if (!fg || !bg) return null;
  return contrastRatio(fg, bg);
}

function Ratio({ value }: { value: number | null }) {
  if (value === null) return null;
  const passes = value >= 3;
  return (
    <span className={`shrink-0 font-mono text-xs ${passes ? 'text-success' : 'text-destructive'}`}>
      {value.toFixed(2)}:1 {passes ? 'passes' : 'fails'} 3:1
    </span>
  );
}

export function NonTextContrastGood() {
  const inputRef = useRef<HTMLInputElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const [ratios, setRatios] = useState<{ border: number | null; track: number | null; icon: number | null }>({
    border: null,
    track: null,
    icon: null,
  });

  const remeasure = useCallback(() => {
    setRatios({
      border: measure(inputRef.current, 'borderTopColor'),
      track: measure(trackRef.current, 'backgroundColor'),
      icon: measure(iconRef.current, 'color'),
    });
  }, []);

  useEffect(() => {
    remeasure();
    // The tokens move when the theme flips, so the measurement has to move with it.
    const observer = new MutationObserver(remeasure);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, [remeasure]);

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="space-y-1">
          <label htmlFor="ntc-good-card" className="block text-sm font-medium text-foreground">
            Card number
          </label>
          <input
            ref={inputRef}
            id="ntc-good-card"
            name="cc-number"
            defaultValue="4242 4242 4242 4242"
            className="w-full px-3 py-2 rounded-lg border border-foreground/60 bg-card text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">Input border vs. card</span>
            <Ratio value={ratios.border} />
          </div>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            role="switch"
            aria-checked={false}
            className="flex w-full items-center justify-between gap-3 rounded-lg py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Email me receipts
            <span ref={trackRef} className="relative h-6 w-11 shrink-0 rounded-full bg-foreground/60">
              <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-card" />
            </span>
          </button>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">Toggle off-state track vs. card</span>
            <Ratio value={ratios.track} />
          </div>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            aria-label="Delete card"
            className="flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg
              ref={iconRef}
              className="h-5 w-5 text-foreground/80"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5h6v2m-8 0 1 12h8l1-12" />
            </svg>
          </button>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">Icon-only button glyph vs. card</span>
            <Ratio value={ratios.icon} />
          </div>
        </div>
      </div>

      <p className="text-xs text-success mt-4">
        Same three controls, same live measurement: every boundary and glyph that identifies a control clears 3:1
        against its adjacent color, in both themes.
      </p>
    </div>
  );
}
