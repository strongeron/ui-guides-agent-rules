export function LabelsEverywhereBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <input
          type="text"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="Full Name"
        />
      </div>
      <div>
        <input
          type="email"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="Phone"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        No labels - screen readers can't identify fields
      </p>
    </div>
  );
}
