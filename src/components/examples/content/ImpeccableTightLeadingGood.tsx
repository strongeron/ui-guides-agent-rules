import { useEffect, useRef, useState } from 'react';

const COPY =
  'Line height is the single biggest lever on how readable a block of text feels. When lines have room, the eye separates them without effort and tracks back to the start of the next line automatically.';

const SPACING_SCALE = [
  { label: '8px', note: 'baseline / 3', px: 8 },
  { label: '16px', note: 'baseline × ⅔', px: 16 },
  { label: '24px', note: '1 baseline', px: 24 },
  { label: '48px', note: '2 baselines', px: 48 },
];

function useLeadingRatio<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const fontSize = parseFloat(cs.fontSize);
    const lineHeight = parseFloat(cs.lineHeight);
    if (fontSize > 0 && !Number.isNaN(lineHeight)) {
      setRatio(lineHeight / fontSize);
    }
  }, []);

  return [ref, ratio] as const;
}

export function ImpeccableTightLeadingGood() {
  const [ref, ratio] = useLeadingRatio<HTMLParagraphElement>();

  return (
    <div className="space-y-3">
      {/* 24px baseline grid drawn behind the prose so the derived rhythm is visible */}
      <article className="relative overflow-hidden rounded-lg border border-border bg-card p-4">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="h-6 shrink-0 border-b border-border" />
          ))}
        </div>
        <div className="relative">
          <h4 className="mb-6 h-6 text-base font-semibold leading-6 text-foreground">
            Why leading matters
          </h4>
          <p ref={ref} className="text-base leading-[1.6] text-muted-foreground">
            {COPY}
          </p>
        </div>
      </article>

      <div className="flex items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-success">
          line-height / font-size = {ratio.toFixed(2)}
        </span>
        <span className="text-muted-foreground">inside the 1.5–1.7 body range</span>
      </div>

      <div className="rounded-lg border border-border bg-muted/40 p-3">
        <p className="mb-2 font-mono text-xs text-muted-foreground">
          16px × 1.5 = 24px baseline → the spacing scale falls out of it
        </p>
        <div className="flex flex-wrap items-end gap-2">
          {SPACING_SCALE.map((step) => (
            <div key={step.label} className="flex flex-col items-center gap-1">
              <div
                className="w-10 rounded-sm border border-border bg-card"
                style={{ height: `${step.px}px` }}
              />
              <span className="font-mono text-[10px] text-foreground">{step.label}</span>
              <span className="text-[10px] text-muted-foreground">{step.note}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-success">
        Body leading of 1.6 keeps the lines apart, and the resulting 24px line box becomes the unit
        every margin and gap is a multiple of — one number generates the whole vertical rhythm.
      </p>
    </div>
  );
}
