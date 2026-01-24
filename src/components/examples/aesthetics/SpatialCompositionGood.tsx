export function SpatialCompositionGood() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="relative h-48">
        {/* Large featured card */}
        <div
          className="absolute bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center text-xs"
          style={{ top: 0, left: 0, width: '60%', height: '70%' }}
        >
          Featured
        </div>
        {/* Overlapping accent card */}
        <div
          className="absolute bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center text-xs shadow-lg"
          style={{ top: '40%', left: '45%', width: '45%', height: '50%', zIndex: 10 }}
        >
          Highlight
        </div>
        {/* Small offset card */}
        <div
          className="absolute bg-muted rounded-lg flex items-center justify-center text-xs"
          style={{ top: '10%', right: 0, width: '30%', height: '35%' }}
        >
          Detail
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Asymmetry, overlap, and varied sizes create visual interest
      </p>
    </div>
  );
}
