export function AllStatesGood() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Your Projects</h3>
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">No projects yet</h4>
          <p className="text-sm text-gray-500 mb-4">
            Create your first project to get started
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Create Project
          </button>
        </div>
      </div>
      <p className="text-xs text-green-700 mt-4">
        Empty state with icon, explanation, and clear CTA
      </p>
    </div>
  );
}
