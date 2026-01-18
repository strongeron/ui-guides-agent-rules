export function NoDeadZonesGood() {
  const handleCardClick = () => {
    // Navigate to project
  };

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={handleCardClick}
        className="w-full text-left bg-card border border-border rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
              A
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Project Alpha</h3>
              <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
            </div>
            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
              Open
            </span>
          </div>
        </div>
      </button>
      <p className="text-xs text-success mt-4">
        Entire card is clickable - no dead zones
      </p>
    </div>
  );
}
