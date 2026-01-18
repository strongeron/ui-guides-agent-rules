export function NonBreakingSpacesGood() {
  return (
    <div className="w-full max-w-xs">
      <div className="bg-card border border-border rounded-lg p-4 text-sm">
        <p className="mb-2">File size: 10&nbsp;MB</p>
        <p className="mb-2">Shortcut: ⌘&nbsp;+&nbsp;K</p>
        <p>Built with Vercel&nbsp;SDK</p>
      </div>
      <p className="text-xs text-success mt-4">
        Non-breaking spaces keep terms together
      </p>
    </div>
  );
}
