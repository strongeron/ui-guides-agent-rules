export function IbelickTailwindDefaultsGood() {
  return (
    <div className="space-y-4">
      {/* Using Tailwind default spacing scale */}
      <div className="p-3 rounded-md bg-muted">
        <p className="text-lg leading-snug mb-2">Card Title</p>
        <p className="text-sm text-muted-foreground">
          This card uses Tailwind's default spacing scale for consistent rhythm.
        </p>
      </div>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
        Submit
      </button>
      <p className="text-xs text-success mt-4">
        Default scale (p-3, px-4, py-2) ensures visual consistency
      </p>
    </div>
  );
}
