export function AmpersandInTightSpaceGood() {
  const items = ['Overview', 'Billing & Invoices', 'Logs & Analytics', 'Domains'];

  return (
    <div className="w-full max-w-sm space-y-4">
      <nav className="w-40 bg-card border border-border rounded-lg p-2 space-y-1">
        {items.map((item) => (
          <a
            key={item}
            href="#nav-good"
            className="block px-2 py-1.5 text-sm text-muted-foreground rounded whitespace-nowrap overflow-hidden text-ellipsis hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item}
          </a>
        ))}
      </nav>
      <p className="text-xs text-success">
        Same width, same meaning: "&" fits every label on one line with nothing
        clipped
      </p>
    </div>
  );
}
