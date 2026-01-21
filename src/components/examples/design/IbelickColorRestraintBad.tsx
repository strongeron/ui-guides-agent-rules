export function IbelickColorRestraintBad() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">Dashboard</span>
          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">Active</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">View</button>
          <button className="px-3 py-1 bg-purple-500 text-white text-sm rounded">Edit</button>
          <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded">Share</button>
          <button className="px-3 py-1 bg-pink-500 text-white text-sm rounded">Export</button>
        </div>
        <p className="text-sm">
          <span className="text-red-500">3 errors</span> •
          <span className="text-yellow-500"> 5 warnings</span> •
          <span className="text-cyan-500"> 12 info</span>
        </p>
      </div>
      <p className="text-xs text-destructive">
        Rainbow of colors - no clear hierarchy, overwhelming visual noise
      </p>
    </div>
  );
}
