export function IbelickColorRestraintGood() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">Dashboard</span>
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">Active</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded">View</button>
          <button className="px-3 py-1 bg-muted text-sm rounded">Edit</button>
          <button className="px-3 py-1 bg-muted text-sm rounded">Share</button>
          <button className="px-3 py-1 bg-muted text-sm rounded">Export</button>
        </div>
        <p className="text-sm text-muted-foreground">
          3 errors • 5 warnings • 12 info
        </p>
      </div>
      <p className="text-xs text-success">
        One accent color for primary action - clear hierarchy, calm interface
      </p>
    </div>
  );
}
