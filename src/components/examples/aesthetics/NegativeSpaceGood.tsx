export function NegativeSpaceGood() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      {/* Spacious product card with intentional negative space */}
      <div className="border border-border rounded-xl overflow-hidden">
        {/* Image placeholder - generous height */}
        <div className="h-40 bg-muted flex items-center justify-center text-sm text-muted-foreground">
          Product Image
        </div>
        {/* Content - generous padding, comfortable line-height */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-medium leading-snug">
              Premium Wireless Headphones
            </h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">
              New
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            High-quality audio with noise cancellation and 30-hour battery life.
            Perfect for work and travel.
          </p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-lg font-bold">$299</span>
            <span className="text-sm text-muted-foreground line-through">$349</span>
            <span className="text-sm text-destructive font-medium">-14%</span>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="flex-1 text-sm bg-primary text-primary-foreground py-2.5 px-4 rounded-lg font-medium">
              Add to Cart
            </button>
            <button className="text-sm border border-border py-2.5 px-4 rounded-lg">
              Save
            </button>
          </div>
          <div className="flex items-center gap-1.5 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="size-3 rounded-full bg-yellow-400" />
            ))}
            <span className="text-sm text-muted-foreground ml-1">(128 reviews)</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Generous spacing creates hierarchy and lets content breathe
      </p>
    </div>
  );
}
