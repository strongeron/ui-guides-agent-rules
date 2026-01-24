export function ColorDominanceGood() {
  return (
    <div className="w-full max-w-md p-6 rounded-lg" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="flex gap-2 mb-4">
        <div className="w-12 h-8 rounded" style={{ backgroundColor: '#0a0a0a', border: '1px solid #333' }} title="Dominant" />
        <div className="w-8 h-8 rounded" style={{ backgroundColor: '#18181b' }} title="Surface" />
        <div className="w-6 h-8 rounded" style={{ backgroundColor: '#f97316' }} title="Accent" />
      </div>
      <div className="space-y-2">
        <button
          className="px-4 py-2 text-white rounded text-sm font-medium"
          style={{ backgroundColor: '#f97316' }}
        >
          Primary Action
        </button>
        <button
          className="px-4 py-2 rounded text-sm ml-2"
          style={{ backgroundColor: '#18181b', color: '#a1a1aa' }}
        >
          Secondary
        </button>
      </div>
      <p className="text-xs mt-4" style={{ color: '#22c55e' }}>
        Bold dominant color with sharp accent creates clear hierarchy
      </p>
    </div>
  );
}
