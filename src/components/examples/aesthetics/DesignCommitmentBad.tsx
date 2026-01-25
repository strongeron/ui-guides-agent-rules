export function DesignCommitmentBad() {
  return (
    <div className="w-full max-w-md p-4 bg-neutral-100 rounded-lg">
      {/* Intentionally light background to show washed-out design */}
      <div className="p-8 rounded-lg bg-neutral-50 border border-neutral-200">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2 text-neutral-500">
            Welcome to Our Platform
          </h2>
          <p className="text-sm mb-6 text-neutral-400">
            A simple solution for your everyday needs.
            Get started today.
          </p>
          <button className="px-6 py-2 rounded text-sm bg-neutral-300 text-neutral-500 border border-neutral-300">
            Get Started
          </button>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Pale grays, washed-out colors, no visual identity - forgettable and timid
      </p>
    </div>
  );
}
