import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
          aria-label="Previous principle"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next principle"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
