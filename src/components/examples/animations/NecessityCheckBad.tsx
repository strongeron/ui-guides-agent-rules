export function NecessityCheckBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-pulse-slow">
            <div className="w-8 h-8 bg-blue-100 rounded-full animate-spin-slow" />
            <div className="flex-1">
              <div className="h-3 bg-blue-100 rounded animate-bounce-subtle w-3/4" />
              <div className="h-2 bg-gray-200 rounded mt-1 animate-bounce-subtle w-1/2" style={{ animationDelay: '0.1s' }} />
            </div>
            <div className="w-16 h-8 bg-blue-600 rounded animate-pulse" />
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Everything animates. The constant motion is distracting and doesn't convey meaning.
        </p>
        <style>{`
          @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
          .animate-pulse-slow { animation: pulse-slow 3s infinite; }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
          .animate-bounce-subtle { animation: bounce-subtle 2s infinite; }
        `}</style>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Gratuitous animation - distracting, no purpose
      </p>
    </div>
  );
}
