export function ResponsiveImagesBad() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Single large image for all devices */}
        <img
          src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Product showcase"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold mb-2">Product Showcase</h3>
          <p className="text-sm text-muted-foreground">
            This 1600px image loads on all devices, even 375px phones.
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-error/10 border border-error/30 rounded text-sm">
        <p className="font-medium text-error">Problems:</p>
        <ul className="text-xs text-error/80 mt-1 space-y-1 list-disc pl-4">
          <li>Single 1600px image for all screen sizes</li>
          <li>Mobile downloads 4x more data than needed</li>
          <li>No <code>srcset</code> or <code>sizes</code> attributes</li>
          <li>Only JPEG format, no WebP/AVIF fallback</li>
          <li>Missing width/height attributes (causes CLS)</li>
        </ul>
      </div>
    </div>
  );
}
