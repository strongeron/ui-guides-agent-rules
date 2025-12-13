export function HueConsistencyBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-blue-600 rounded-lg p-4">
        <div
          className="bg-white rounded-lg p-4"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 className="font-semibold text-gray-900 mb-2">Card Title</h3>
          <p className="text-sm text-gray-600">
            The gray/black shadow and border look harsh against the blue background.
          </p>
        </div>
        <p className="text-xs text-blue-100 mt-4">
          Pure gray shadows clash with colored background
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Neutral shadows on colored background look harsh
      </p>
    </div>
  );
}
