export function DesignVarietyGood() {
  return (
    <div className="w-full max-w-lg">
      <div className="grid grid-cols-3 gap-4">
        {/* Project Card 1 - Dark & Bold */}
        <div
          className="p-4"
          style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #262626',
          }}
        >
          <div
            className="w-full h-16 mb-3 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            }}
          >
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h4
            className="text-sm font-bold mb-1"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: '#fafafa',
              letterSpacing: '-0.02em',
            }}
          >
            Analytics Pro
          </h4>
          <p
            className="text-xs"
            style={{ fontFamily: "'Space Mono', monospace", color: '#a3a3a3' }}
          >
            Raw data power
          </p>
        </div>

        {/* Project Card 2 - Light & Elegant */}
        <div
          className="p-4 rounded-2xl"
          style={{
            backgroundColor: '#faf7f5',
            border: '1px solid #e7e2df',
          }}
        >
          <div
            className="w-full h-16 rounded-xl mb-3 flex items-center justify-center"
            style={{
              backgroundColor: '#f5f0eb',
              border: '1px solid #e7e2df',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px',
                color: '#78716c',
              }}
            >
              C
            </span>
          </div>
          <h4
            className="text-sm mb-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              color: '#44403c',
            }}
          >
            CloudSync
          </h4>
          <p
            className="text-xs italic"
            style={{ fontFamily: "'Source Serif 4', serif", color: '#a8a29e' }}
          >
            Refined storage
          </p>
        </div>

        {/* Project Card 3 - Colorful & Playful */}
        <div
          className="p-4 rounded-3xl"
          style={{
            background: 'linear-gradient(145deg, #fef3c7 0%, #fde68a 100%)',
            border: '2px solid #fbbf24',
          }}
        >
          <div
            className="w-full h-16 rounded-2xl mb-3 flex items-center justify-center"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px rgba(251, 191, 36, 0.3)',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              T
            </span>
          </div>
          <h4
            className="text-sm font-extrabold mb-1"
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: '#92400e',
            }}
          >
            TaskFlow
          </h4>
          <p
            className="text-xs font-medium"
            style={{ fontFamily: "'Nunito', sans-serif", color: '#b45309' }}
          >
            Joyful productivity
          </p>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Three distinct personalities: dark/bold, light/elegant, colorful/playful - each memorable and differentiated
      </p>
    </div>
  );
}
