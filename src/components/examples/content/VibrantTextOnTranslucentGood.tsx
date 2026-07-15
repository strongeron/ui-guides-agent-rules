export function VibrantTextOnTranslucentGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-lg">
        {/* Same busy backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(120deg, #f9d423 0%, #ff4e50 35%, #1f1c2c 60%, #4ca1af 100%)',
          }}
        />
        {/* Glass panel: opacity lives on a dark solid backing, text stays fully opaque on top */}
        <div
          className="relative m-4 rounded-lg p-4"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', background: 'rgba(20,18,28,0.55)' }}
        >
          <p style={{ color: '#ffffff', fontWeight: 600, letterSpacing: '0.01em' }}>Weekly report ready</p>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, letterSpacing: '0.01em' }}>
            12,480 events processed
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-success">
        Opaque text, more weight and contrast, and the opacity moved onto a solid backing — legible over any backdrop.
      </p>
    </div>
  );
}
