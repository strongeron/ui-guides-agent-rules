const PHOTO =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=320&h=160&fit=crop';

export function ImageTagNotBackgroundGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <img
          src={PHOTO}
          alt="Four engineers reviewing a deployment on a shared laptop"
          width={320}
          height={128}
          className="w-full h-32 rounded-md object-cover bg-muted"
        />
        <p className="text-xs text-muted-foreground font-mono">
          {'<img src="team.jpg" alt="Four engineers…" />'}
        </p>
        <div className="p-2 bg-muted rounded text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Right-click menu</p>
          <p>Open Image in New Tab · Save Image As… · Copy Image</p>
          <p className="text-success">
            Screen reader: "Four engineers reviewing a deployment on a shared
            laptop, image"
          </p>
        </div>
      </div>
      <p className="text-xs text-success">
        Content images belong in an img: alt text for screen readers, and the
        native save/copy affordances users expect
      </p>
    </div>
  );
}
