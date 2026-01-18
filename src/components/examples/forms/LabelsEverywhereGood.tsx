export function LabelsEverywhereGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <label htmlFor="full-name" className="block text-sm font-medium text-foreground mb-1">
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="email-address" className="block text-sm font-medium text-foreground mb-1">
          Email Address
        </label>
        <input
          id="email-address"
          type="email"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone-number" className="block text-sm font-medium text-foreground mb-1">
          Phone Number
        </label>
        <input
          id="phone-number"
          type="tel"
          className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          placeholder="+1 (555) 000-0000"
        />
      </div>
      <p className="text-xs text-success">
        Proper labels for accessibility
      </p>
    </div>
  );
}
