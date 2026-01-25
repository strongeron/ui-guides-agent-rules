export function ComplexityMatchingBad() {
  return (
    <div className="w-full max-w-md">
      {/* Intentionally light-themed card demonstrating over-designed aesthetics */}
      <div
        className="p-6 rounded-xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.03),
            0 4px 8px rgba(0, 0, 0, 0.04),
            0 8px 16px rgba(0, 0, 0, 0.05),
            0 16px 32px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `,
          border: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Excessive blur effect */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(196, 181, 253, 0.3) 0%, transparent 70%)',
            filter: 'blur(25px)',
          }}
        />

        <div className="relative z-10">
          <span
            className="inline-block text-xs font-medium tracking-wider uppercase mb-3 px-2 py-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #f0f9ff, #ede9fe)',
              color: '#6366f1',
            }}
          >
            Simple Note
          </span>
          <h3
            className="text-lg font-medium mb-2"
            style={{
              color: '#1e293b',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
            }}
          >
            Meeting reminder
          </h3>
          <p
            className="text-sm mb-4"
            style={{
              color: '#64748b',
              lineHeight: '1.6',
            }}
          >
            Team standup at 10:00 AM
          </p>
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Minimalist content with maximalist styling: layered shadows, gradients, blurs, and glows overwhelm a simple note
      </p>
    </div>
  );
}
