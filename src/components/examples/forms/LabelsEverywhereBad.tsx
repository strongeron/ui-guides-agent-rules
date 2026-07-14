export function LabelsEverywhereBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <input
          type="text"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Full Name"
        />
      </div>
      <div>
        <input
          type="email"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Phone"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        No labels - screen readers can't identify fields
      </p>
    </div>
  );
}
