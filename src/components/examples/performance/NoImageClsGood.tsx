export function NoImageCLSGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Product Card</h3>
        <div className="relative w-full mb-2" style={{ aspectRatio: '4/3' }}>
          <img
            src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Black premium wireless headphones with cushioned ear cups"
            className="absolute inset-0 w-full h-full object-cover rounded"
            width={400}
            height={300}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Reserved aspect ratio prevents layout shift when image loads.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        aspect-ratio reserves space, preventing layout shift
      </p>
    </div>
  );
}
