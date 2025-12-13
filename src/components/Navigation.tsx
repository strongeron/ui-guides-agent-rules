import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function Navigation({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 max-w-screen-2xl mx-auto">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Previous principle"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Next principle"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
