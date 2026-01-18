export function MinimumContrastBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Settings</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-300">
            This light gray text is hard to read against white background
          </p>
          <button className="px-4 py-2 bg-muted text-gray-300 rounded-lg text-sm">
            Low Contrast Button
          </button>
        </div>
      </div>
      <p className="text-xs text-error mt-4">
        Insufficient contrast makes text hard to read
      </p>
    </div>
  );
}
