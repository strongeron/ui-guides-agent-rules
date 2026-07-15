export function VibrantTextOnTranslucentBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-lg">
        {/* Busy, high-variance backdrop the glass sits over */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, #f9d423 0%, #ff4e50 35%, #1f1c2c 60%, #4ca1af 100%)',
          }}
        />
        {/* Glass panel with flat, translucent gray text */}
        <div
          className="relative m-4 rounded-lg p-4"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.12)' }}
        >
          <p style={{ color: 'rgba(60,60,60,0.65)', fontWeight: 400 }}>Weekly report ready</p>
          <p className="mt-1 text-sm" style={{ color: 'rgba(60,60,60,0.55)', fontWeight: 400 }}>
            12,480 events processed
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Flat translucent gray disappears wherever the backdrop goes light or dark behind it.
      </p>
    </div>
  );
}
