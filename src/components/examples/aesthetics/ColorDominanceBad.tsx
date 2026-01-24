export function ColorDominanceBad() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="flex gap-2 mb-4">
        <div className="w-8 h-8 rounded bg-blue-400" title="Blue" />
        <div className="w-8 h-8 rounded bg-green-400" title="Green" />
        <div className="w-8 h-8 rounded bg-purple-400" title="Purple" />
        <div className="w-8 h-8 rounded bg-orange-400" title="Orange" />
        <div className="w-8 h-8 rounded bg-pink-400" title="Pink" />
      </div>
      <div className="space-y-2">
        <button className="px-4 py-2 bg-blue-400 text-white rounded text-sm">
          Primary Action
        </button>
        <button className="px-4 py-2 bg-green-400 text-white rounded text-sm ml-2">
          Secondary
        </button>
        <button className="px-4 py-2 bg-purple-400 text-white rounded text-sm ml-2">
          Tertiary
        </button>
      </div>
      <p className="text-xs text-destructive mt-4">
        Evenly-distributed colors create visual confusion with no hierarchy
      </p>
    </div>
  );
}
