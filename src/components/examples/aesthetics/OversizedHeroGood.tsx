/**
 * Same 1000x760 page at 0.4 scale, same 600px fold, same 88px h1.
 * Only the headline's length changed — and with it, its viewport share.
 */
export function OversizedHeroGood() {
  return (
    <div className="w-full">
      <div className="relative w-[400px] max-w-full h-[304px] overflow-hidden rounded-lg border border-border bg-card">
        <div className="absolute top-0 left-0 w-[1000px] h-[760px] origin-top-left scale-[0.4] p-14">
          <nav className="flex items-center justify-between text-[16px] text-muted-foreground mb-10">
            <span className="font-semibold text-foreground">Relay</span>
            <span>Docs · Pricing · Log in</span>
          </nav>

          {/* Still 88px. Four words, so it is one line and roughly 15% of the viewport. */}
          <h1 className="text-[88px] leading-[1.05] font-semibold tracking-tight text-foreground">
            Ship software faster
          </h1>

          {/* The sentence survives — demoted to a 20px subhead, where sentences belong */}
          <p className="mt-6 max-w-[620px] text-[20px] leading-[1.5] text-muted-foreground">
            The complete platform for teams who want to ship reliable software much faster.
          </p>

          <button className="mt-8 rounded-lg bg-foreground px-8 py-4 text-[20px] font-medium text-background">
            Start building
          </button>
        </div>

        <div className="absolute inset-x-0 top-[240px] bottom-0 bg-background/70 backdrop-grayscale border-t border-dashed border-success" />
        <span className="absolute top-[244px] right-2 text-[10px] font-medium text-success">
          fold — 600px
        </span>
      </div>
      <p className="text-xs text-success mt-4">
        Display size is untouched — 88px is fine, and short headlines are exactly what it is for.
        Dropping to 20 characters takes the h1 to one line, and the sentence and the CTA both fit
        above the fold.
      </p>
    </div>
  );
}
