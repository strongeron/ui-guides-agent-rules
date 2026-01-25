export function NegativeSpaceBad() {
  return (
    <div className="w-full max-w-md p-3 bg-card rounded-lg">
      {/* Cramped product card with no breathing room */}
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Image placeholder - tight */}
        <div className="h-24 bg-muted flex items-center justify-center text-xs text-muted-foreground">
          Product Image
        </div>
        {/* Content - cramped padding, tight line-height */}
        <div className="p-2">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-medium truncate">Premium Wireless Headphones</span>
            <span className="text-xs bg-primary/10 text-primary px-1 rounded">New</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
            High-quality audio with noise cancellation and 30-hour battery life. Perfect for work and travel.
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-bold">$299</span>
            <span className="text-[10px] text-muted-foreground line-through">$349</span>
            <span className="text-[10px] text-destructive">-14%</span>
          </div>
          <div className="flex gap-1 mt-1">
            <button className="flex-1 text-[10px] bg-primary text-primary-foreground py-1 px-1 rounded">
              Add to Cart
            </button>
            <button className="text-[10px] border border-border py-1 px-1 rounded">
              Save
            </button>
          </div>
          <div className="flex items-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="size-2 rounded-full bg-yellow-500" />
            ))}
            <span className="text-[10px] text-muted-foreground">(128)</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-destructive mt-2">
        Cramped layout with no breathing room feels claustrophobic
      </p>
    </div>
  );
}
