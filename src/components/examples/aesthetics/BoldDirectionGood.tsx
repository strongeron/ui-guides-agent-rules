export function BoldDirectionGood() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-6"
        style={{
          backgroundColor: '#fafaf9',
          border: '1px solid #e7e5e4',
        }}
      >
        <div className="mb-4">
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: '#78716c' }}
          >
            Brutalist
          </span>
        </div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "'Courier New', monospace",
            color: '#1c1917',
            letterSpacing: '-0.02em',
          }}
        >
          Raw. Functional. Direct.
        </h3>
        <p className="text-sm mb-4" style={{ color: '#57534e', lineHeight: '1.6' }}>
          No decoration for its own sake. Every element serves a purpose.
          The absence of style is the style.
        </p>
        <button
          className="px-4 py-2 text-sm font-medium"
          style={{
            backgroundColor: '#1c1917',
            color: '#fafaf9',
            border: 'none',
          }}
        >
          Enter
        </button>
      </div>
      <p className="text-xs text-success mt-4">
        Committed direction (brutalist) executed with precision and intention
      </p>
    </div>
  );
}
