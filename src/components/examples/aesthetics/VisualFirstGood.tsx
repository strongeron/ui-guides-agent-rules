export function VisualFirstGood() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        {/* Feature 1 - visual dominant */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-2"
            style={{ backgroundColor: '#f97316' }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-xs font-medium">Fast</span>
        </div>
        {/* Feature 2 - visual dominant */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-2"
            style={{ backgroundColor: '#0a0a0a', border: '2px solid #333' }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: '#22c55e' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <span className="text-xs font-medium">Secure</span>
        </div>
        {/* Feature 3 - visual dominant */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-2"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
              />
            </svg>
          </div>
          <span className="text-xs font-medium">Integrated</span>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Bold visuals tell the story - text appears only as essential labels
      </p>
    </div>
  );
}
