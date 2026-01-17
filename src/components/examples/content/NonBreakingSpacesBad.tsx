export function NonBreakingSpacesBad() {
  return (
    <div className="w-full max-w-xs">
      <div className="bg-card border border-border rounded-lg p-4 text-sm">
        <p className="mb-2">File size: 10 MB</p>
        <p className="mb-2">Shortcut: ⌘ + K</p>
        <p>Built with Vercel SDK</p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Units and shortcuts can break across lines
      </p>
    </div>
  );
}
