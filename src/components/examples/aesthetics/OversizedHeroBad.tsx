/**
 * A 1000x760 page rendered at 0.4 scale, so the type sizes below are real:
 * the h1 is genuinely 88px, and the dashed line is a genuine 600px fold.
 */
export function OversizedHeroBad() {
  return (
    <div className="w-full">
      <div className="relative w-[400px] max-w-full h-[304px] overflow-hidden rounded-lg border border-border bg-card">
        <div className="absolute top-0 left-0 w-[1000px] h-[760px] origin-top-left scale-[0.4] p-14">
          <nav className="flex items-center justify-between text-[16px] text-muted-foreground mb-10">
            <span className="font-semibold text-foreground">Relay</span>
            <span>Docs · Pricing · Log in</span>
          </nav>

          {/* 88px display size carrying a 90-character sentence */}
          <h1 className="text-[88px] leading-[1.05] font-semibold tracking-tight text-foreground">
            The complete platform for teams who want to ship reliable software much faster
          </h1>

          <button className="mt-10 rounded-lg bg-foreground px-8 py-4 text-[20px] font-medium text-background">
            Start building
          </button>
        </div>

        {/* Everything past 600px (= 240px at this scale) is below the fold */}
        <div className="absolute inset-x-0 top-[240px] bottom-0 bg-background/70 backdrop-grayscale border-t border-dashed border-error" />
        <span className="absolute top-[244px] right-2 text-[10px] font-medium text-error">
          fold — 600px
        </span>
      </div>
      <p className="text-xs text-error mt-4">
        All three detector conditions fire at once: 88px (&ge;72), 78 characters (&ge;40), and an h1
        that eats roughly 70% of viewport height (&ge;28%). The CTA is the entire point of the page
        and it has been pushed under the fold by the headline.
      </p>
    </div>
  );
}
