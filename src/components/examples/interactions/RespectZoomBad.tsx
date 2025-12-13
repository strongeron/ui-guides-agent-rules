export function RespectZoomBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <code className="text-xs text-red-800 font-mono block">
            {'<meta name="viewport" content="'}
            <span className="bg-red-200">maximum-scale=1, user-scalable=no</span>
            {'" />'}
          </code>
        </div>
        <p className="text-sm text-gray-600">
          This viewport meta tag prevents users from zooming. This is harmful for users with low vision who need to zoom to read content.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        Disabling zoom removes an important accessibility feature
      </p>
    </div>
  );
}
