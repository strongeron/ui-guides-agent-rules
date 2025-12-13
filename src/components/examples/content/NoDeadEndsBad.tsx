import { Search } from 'lucide-react';

export function NoDeadEndsBad() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No results found</p>
      </div>
      <p className="text-xs text-red-700 mt-4">
        No guidance on what to do next
      </p>
    </div>
  );
}
