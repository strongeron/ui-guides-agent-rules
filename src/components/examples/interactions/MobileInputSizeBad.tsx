export function MobileInputSizeBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ fontSize: '14px' }}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          On iOS Safari, tapping this input causes the page to zoom in because the font size is below 16px.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        14px font size causes iOS Safari to auto-zoom on focus
      </p>
    </div>
  );
}
