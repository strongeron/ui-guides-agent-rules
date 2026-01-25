export function ComplexityMatchingGood() {
  return (
    <div className="w-full max-w-md">
      {/* Intentionally light-themed card demonstrating minimal aesthetics */}
      <div
        className="p-6"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
        }}
      >
        <span
          className="inline-block text-xs font-medium tracking-wider uppercase mb-3"
          style={{ color: '#6b7280' }}
        >
          Simple Note
        </span>
        <h3
          className="text-lg font-medium mb-2"
          style={{ color: '#111827' }}
        >
          Meeting reminder
        </h3>
        <p
          className="text-sm mb-4"
          style={{
            color: '#6b7280',
            lineHeight: '1.5',
          }}
        >
          Team standup at 10:00 AM
        </p>
        <button
          className="px-4 py-2 text-sm font-medium"
          style={{
            backgroundColor: '#111827',
            color: '#ffffff',
            borderRadius: '6px',
            border: 'none',
          }}
        >
          Dismiss
        </button>
      </div>
      <p className="text-xs text-success mt-4">
        Minimal content, minimal styling: clean border, single subtle shadow, restrained typography
      </p>
    </div>
  );
}
