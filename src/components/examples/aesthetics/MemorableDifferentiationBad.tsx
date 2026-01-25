export function MemorableDifferentiationBad() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-8 rounded-lg"
        style={{
          backgroundColor: '#18181b',
          border: '1px solid #27272a',
        }}
      >
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: '#fafafa' }}
        >
          Start your free trial
        </h3>
        <p
          className="text-sm mb-6"
          style={{ color: '#a1a1aa' }}
        >
          Join thousands of teams already using our platform to boost productivity.
        </p>
        <button
          className="w-full px-6 py-3 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
          }}
        >
          Get Started
        </button>
        <p
          className="text-xs text-center mt-3"
          style={{ color: '#71717a' }}
        >
          No credit card required
        </p>
      </div>
      <p className="text-xs text-destructive mt-4">
        Generic CTA: nothing memorable, looks like every other SaaS landing page
      </p>
    </div>
  );
}
