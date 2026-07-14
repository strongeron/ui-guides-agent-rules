export function AmpersandInTightSpaceBad() {
  const items = ['Overview', 'Billing and Invoices', 'Logs and Analytics', 'Domains'];

  return (
    <div className="w-full max-w-sm space-y-4">
      <nav className="w-40 bg-card border border-border rounded-lg p-2 space-y-1">
        {items.map((item) => (
          <a
            key={item}
            href="#nav-bad"
            className="block px-2 py-1.5 text-sm text-muted-foreground rounded whitespace-nowrap overflow-hidden text-ellipsis hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item}
          </a>
        ))}
      </nav>
      <p className="text-xs text-error">
        In a 160px sidebar, "and" costs the three characters that push the label
        past the edge — two items truncate mid-word
      </p>
    </div>
  );
}
