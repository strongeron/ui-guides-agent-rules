export function CssFirstAnimationsGood() {
  return (
    <div className="w-full max-w-sm flex flex-col items-center py-8">
      <button
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium
          transition-transform-shadow duration-200 ease-out
          hover:scale-105 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40
          active:scale-100"
      >
        Hover Me
      </button>

      <div className="mt-6 p-4 bg-muted rounded-lg text-sm font-mono text-muted-foreground">
        <p className="mb-2">CSS transitions + Tailwind</p>
        <p>hover: and active: variants</p>
      </div>

      <p className="text-xs text-success mt-4 text-center max-w-xs">
        Pure CSS transitions run on the compositor thread - no JavaScript overhead, cleaner code
      </p>
    </div>
  );
}
