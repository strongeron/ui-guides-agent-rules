import { useEffect, useRef, useState } from 'react';

const COPY =
  'The deploy pipeline runs your build in an isolated container, uploads the output to the edge network, and swaps the alias once every region reports healthy. If a region fails its health check the previous deployment stays live, so a bad build never reaches a visitor. Rollbacks are instant because the old output is still on disk.';

/** impeccable's detector estimates characters-per-line as width / (fontSize * 0.5). */
function useCharsPerLine<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [cpl, setCpl] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      // offsetWidth is the layout width, unaffected by the ancestor scale transform
      setCpl(Math.round(el.offsetWidth / (fontSize * 0.5)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, cpl] as const;
}

export function ImpeccableLineLengthBad() {
  const [ref, cpl] = useCharsPerLine<HTMLParagraphElement>();

  return (
    <div className="space-y-3">
      {/* A full-width 1120px page, shown zoomed out so the line length is visible at a glance */}
      <div className="relative h-[150px] overflow-hidden rounded-lg border border-border bg-card">
        <div className="absolute left-0 top-0 w-[1120px] origin-top-left scale-[0.4] p-6">
          <h4 className="mb-3 text-2xl font-semibold text-foreground">How deploys work</h4>
          <p ref={ref} className="text-base leading-relaxed text-muted-foreground">
            {COPY}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="rounded border border-border bg-muted px-2 py-1 font-mono text-error">
          {cpl} chars/line
        </span>
        <span className="text-muted-foreground">detector flags anything over 85</span>
      </div>

      <p className="text-xs text-error">
        The paragraph fills the whole page width, so every line runs ~{cpl} characters. The eye has
        to travel that far back to find the start of the next line, and loses its place.
      </p>
    </div>
  );
}
