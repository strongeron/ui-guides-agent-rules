export function RedundantCuesGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Order Status</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-green-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Delivered</span>
            </div>
            <span className="text-sm">Order #1234</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-yellow-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Pending</span>
            </div>
            <span className="text-sm">Order #1235</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-red-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Cancelled</span>
            </div>
            <span className="text-sm">Order #1236</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Color + icon + text label - accessible to all
      </p>
    </div>
  );
}
