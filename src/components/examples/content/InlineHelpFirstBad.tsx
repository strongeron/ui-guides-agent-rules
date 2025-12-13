import { HelpCircle } from 'lucide-react';

export function InlineHelpFirstBad() {
  return (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label htmlFor="bad-inline-api" className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <button
              type="button"
              title="Your API key is used to authenticate requests"
              className="text-gray-400 hover:text-gray-600"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <input
            id="bad-inline-api"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>
      </form>
      <p className="text-xs text-red-700 mt-4">
        Help hidden in tooltip, not accessible on touch
      </p>
    </div>
  );
}
