export function SemanticsFirstBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="space-y-3">
          <div
            role="button"
            tabIndex={0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Submit Form
          </div>
          <div
            role="link"
            tabIndex={0}
            className="text-blue-600 underline cursor-pointer hover:text-blue-800"
          >
            View Documentation
          </div>
        </div>
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
          <code className="text-xs text-red-800 font-mono block whitespace-pre">
{`<div role="button">...</div>
<div role="link">...</div>`}
          </code>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Divs with roles don't get native keyboard events, form submission, or middle-click behavior.
        </p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        ARIA roles on divs - missing native behaviors
      </p>
    </div>
  );
}
