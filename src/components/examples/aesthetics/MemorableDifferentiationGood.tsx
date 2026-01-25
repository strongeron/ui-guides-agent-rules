export function MemorableDifferentiationGood() {
  return (
    <div className="w-full max-w-md">
      {/* Container with animated gradient border */}
      <div
        className="relative p-8 rounded-lg overflow-hidden"
        style={{
          backgroundColor: '#18181b',
        }}
      >
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-lg motion-safe:animate-[spin_4s_linear_infinite]"
          style={{
            background: 'conic-gradient(from 0deg, #f97316, #ec4899, #8b5cf6, #3b82f6, #10b981, #f97316)',
            padding: '2px',
            maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
          }}
        />
        {/* Inner content container */}
        <div className="relative">
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
            className="w-full px-6 py-3 rounded-lg text-sm font-medium transition-transform hover:scale-[1.02]"
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
      </div>
      <p className="text-xs text-success mt-4">
        One memorable element: animated gradient border that draws the eye
      </p>
    </div>
  );
}
