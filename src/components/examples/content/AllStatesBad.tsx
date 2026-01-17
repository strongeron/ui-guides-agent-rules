export function AllStatesBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Your Projects</h3>
        <div className="border border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground text-sm">No projects</p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Empty state shows nothing helpful. No guidance on what to do next.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Empty state with no guidance or next steps
      </p>
    </div>
  );
}
