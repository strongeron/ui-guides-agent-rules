export function NoImageCLSBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Product Card</h3>
        <img
          src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt="Product"
          className="w-full rounded mb-2"
        />
        <p className="text-sm text-muted-foreground">
          Product description appears after the image loads, causing content to shift down.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        No reserved space causes layout shift when image loads
      </p>
    </div>
  );
}
