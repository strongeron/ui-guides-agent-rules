export function InteractionsIncreaseContrastGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2">
        <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring text-sm">
          Hover Me (darkens)
        </button>
        <a href="#" className="block text-primary hover:text-primary/80 hover:underline transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded text-sm">
          Link darkens on hover
        </a>
      </div>
      <p className="text-xs text-success mt-4">
        Clear visual feedback with increased contrast
      </p>
    </div>
  );
}
