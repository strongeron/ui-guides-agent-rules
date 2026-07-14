import { useEffect, useRef, useState } from 'react';

const COPY =
  'Line height is the single biggest lever on how readable a block of text feels. When lines sit too close, the descenders of one line collide with the ascenders of the next and the eye can no longer separate them, so it keeps re-reading the same line.';

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

export function ImpeccableTightLeadingBad() {
  const [ref, ratio] = useLeadingRatio<HTMLParagraphElement>();

  return (
    <div className="space-y-3">
      <article className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-2 text-base font-semibold leading-none text-foreground">
          Why leading matters
        </h4>
        <p ref={ref} className="text-base leading-none text-muted-foreground">
          {COPY}
        </p>
      </article>

      <div className="flex items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          line-height / font-size = {ratio.toFixed(2)}
        </span>
        <span className="text-muted-foreground">detector flags anything below 1.30</span>
      </div>

      <p className="text-xs text-error">
        <code className="rounded bg-muted px-1 font-mono">leading-none</code> sets the line box to
        exactly the font size, so the lines touch. There is also no baseline unit left to derive
        spacing from — every margin in this article is now an arbitrary guess.
      </p>
    </div>
  );
}
