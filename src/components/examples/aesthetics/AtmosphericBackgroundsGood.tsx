export function AtmosphericBackgroundsGood() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-8 rounded-lg relative overflow-hidden bg-[var(--ex-atmo-base)] bg-[image:var(--ex-atmo-gradients)]"
      >
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-[var(--ex-atmo-title)] mb-2">
            Atmospheric Background
          </h3>
          <p className="text-sm text-[var(--ex-atmo-body)]">
            Gradient mesh with noise texture creates depth and atmosphere.
            Content feels grounded in a rich environment.
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Layered gradients and textures add depth and visual richness
      </p>
    </div>
  );
}
