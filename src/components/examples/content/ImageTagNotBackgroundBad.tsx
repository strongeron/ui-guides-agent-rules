const PHOTO =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=320&h=160&fit=crop';

export function ImageTagNotBackgroundBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <div
          role="presentation"
          className="w-full h-32 rounded-md bg-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${PHOTO})` }}
        />
        <p className="text-xs text-muted-foreground font-mono">
          {'<div style="background-image: url(team.jpg)" />'}
        </p>
        <div className="p-2 bg-muted rounded text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Right-click menu</p>
          <p>Back · Reload · View Page Source</p>
          <p className="text-error">No "Save Image As…", no "Copy Image"</p>
          <p className="text-error">Screen reader: skipped, it isn't an image</p>
        </div>
      </div>
      <p className="text-xs text-error">
        A CSS background is decoration, not content: it has no alt text, no
        role, and the user can't save or copy it
      </p>
    </div>
  );
}
