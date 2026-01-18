export function MinimumContrastGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Settings</h3>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            This darker gray meets APCA contrast standards for readability
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            High Contrast Button
          </button>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Proper contrast ensures readability for all users
      </p>
    </div>
  );
}
