export function MobileInputSizeGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full px-3 py-2 border border-border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Font size is 16px (text-base), so iOS Safari won't auto-zoom when this input is focused.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        16px font size prevents iOS Safari auto-zoom on focus
      </p>
    </div>
  );
}
