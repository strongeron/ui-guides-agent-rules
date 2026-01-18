export function KeyboardEverywhereBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Menu</h3>
        <div className="space-y-2">
          <div
            onClick={() => alert('Edit clicked')}
            className="px-3 py-2 bg-card rounded cursor-pointer hover:bg-muted"
          >
            Edit
          </div>
          <div
            onClick={() => alert('Delete clicked')}
            className="px-3 py-2 bg-card rounded cursor-pointer hover:bg-muted"
          >
            Delete
          </div>
          <div
            onClick={() => alert('Share clicked')}
            className="px-3 py-2 bg-card rounded cursor-pointer hover:bg-muted"
          >
            Share
          </div>
        </div>
      </div>
      <p className="text-xs text-error">
        Div elements can't be reached or activated via keyboard
      </p>
    </div>
  );
}
