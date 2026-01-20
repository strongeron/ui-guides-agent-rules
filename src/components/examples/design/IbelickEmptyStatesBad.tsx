export function IbelickEmptyStatesBad() {
  return (
    <div className="space-y-4">
      <div className="p-8 border border-dashed rounded-lg text-center">
        <p className="text-muted-foreground">No projects found</p>
      </div>
      <p className="text-xs text-destructive">
        Empty state with no guidance - user doesn't know what to do next
      </p>
    </div>
  );
}
