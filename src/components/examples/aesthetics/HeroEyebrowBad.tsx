const sections = ['Features', 'Pricing', 'Testimonials'];

export function HeroEyebrowBad() {
  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card p-6">
        {/* Tell #1: the eyebrow — 12px, uppercase, wide tracking, accent color, right above the h1 */}
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-3">
          Now in Beta
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-tight">
          Build faster
        </h1>
        <p className="text-sm text-muted-foreground mt-3">
          The workflow platform for modern teams.
        </p>

        {/* Tell #2: the same shape repeats as a kicker above every section — 4 total, past the 3+ threshold */}
        {sections.map((s) => (
          <div key={s} className="mt-6 pt-5 border-t border-border">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-2">
              {s}
            </p>
            <div className="h-2 w-3/4 rounded bg-muted" />
            <div className="h-2 w-1/2 rounded bg-muted mt-1.5" />
          </div>
        ))}
      </div>
      <p className="text-xs text-error mt-4">
        Four tracked-caps chips, each an immediately-preceding sibling of a heading at 12px with
        0.2em tracking and bold accent color. One fires the eyebrow detector; four fire the
        repeated-section-kickers rule on top of it.
      </p>
    </div>
  );
}
