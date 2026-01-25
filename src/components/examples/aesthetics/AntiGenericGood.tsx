export function AntiGenericGood() {
  return (
    <div className="w-full max-w-md">
      {/* Intentionally dark-themed card demonstrating distinctive brand aesthetics */}
      <div
        className="p-6"
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid #262626',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: '#dc2626',
            }}
          >
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div className="text-left">
            <h3
              className="text-xl font-bold mb-1"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#fafafa',
                letterSpacing: '-0.01em',
              }}
            >
              Workflow Engine
            </h3>
            <p
              className="text-sm mb-4"
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                color: '#a3a3a3',
                lineHeight: '1.6',
              }}
            >
              Structured automation for teams who value precision over hype.
            </p>
            <button
              className="px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: '#fafafa',
                color: '#0a0a0a',
                border: 'none',
              }}
            >
              Start Building
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Distinctive serif typography, bold single accent color, asymmetric layout, crisp edges
      </p>
    </div>
  );
}
