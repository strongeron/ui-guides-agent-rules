export function AutofocusBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Mobile Search Page</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
          <code className="text-xs text-red-800 font-mono">
            {'<input autoFocus />'}
          </code>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">📱 On mobile:</p>
          <p className="text-xs text-gray-500">
            Autofocus opens the keyboard immediately, causing layout shift and potentially hiding important content above the input.
          </p>
        </div>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Autofocus on mobile causes keyboard layout shift
      </p>
    </div>
  );
}
