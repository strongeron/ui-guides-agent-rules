export function BoldDirectionGood() {
  return (
    <div className="w-full max-w-md">
      <div className="p-6 bg-stone-50 border border-stone-200">
        <div className="mb-4">
          <span className="text-xs font-medium tracking-widest uppercase text-stone-500">
            Brutalist
          </span>
        </div>
        <h3
          className="text-2xl font-bold mb-2 text-stone-900"
          style={{
            fontFamily: "'Courier New', monospace",
            letterSpacing: '-0.02em',
          }}
        >
          Raw. Functional. Direct.
        </h3>
        <p className="text-sm mb-4 text-stone-600 leading-relaxed">
          No decoration for its own sake. Every element serves a purpose.
          The absence of style is the style.
        </p>
        <button className="px-4 py-2 text-sm font-medium bg-stone-900 text-stone-50">
          Enter
        </button>
      </div>
      <p className="text-xs text-success mt-4">
        Committed direction (brutalist) executed with precision and intention
      </p>
    </div>
  );
}
