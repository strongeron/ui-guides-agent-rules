import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  /** Whether sidebar is always visible (desktop/tablet) */
  isDesktop?: boolean;
}

export function Navigation({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isDesktop = false,
}: NavigationProps) {
  return (
    <div className={`fixed bottom-0 right-0 z-40 bg-background border-t border-border ${isDesktop ? 'left-80' : 'left-0'}`}>
      <div className="flex items-center justify-between px-4 py-4 max-w-screen-2xl mx-auto">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
          aria-label="Previous principle"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          Previous
        </Button>

        <Button
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next principle"
        >
          Next
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </Button>
      </div>
    </div>
  );
}
