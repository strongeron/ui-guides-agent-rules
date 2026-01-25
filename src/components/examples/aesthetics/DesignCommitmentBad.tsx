export function DesignCommitmentBad() {
  return (
    <div className="w-full max-w-md">
      <div
        className="p-8 rounded-lg"
        style={{
          backgroundColor: '#f5f5f5',
          border: '1px solid #e5e5e5',
        }}
      >
        <div className="text-center">
          <h2
            className="text-xl font-medium mb-2"
            style={{ color: '#6b7280' }}
          >
            Welcome to Our Platform
          </h2>
          <p
            className="text-sm mb-6"
            style={{ color: '#9ca3af' }}
          >
            A simple solution for your everyday needs.
            Get started today.
          </p>
          <button
            className="px-6 py-2 rounded text-sm"
            style={{
              backgroundColor: '#d1d5db',
              color: '#6b7280',
              border: '1px solid #c4c7cc',
            }}
          >
            Get Started
          </button>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Pale grays, washed-out colors, no visual identity - forgettable and timid
      </p>
    </div>
  );
}
