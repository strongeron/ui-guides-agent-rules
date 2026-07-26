import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { principlePath, shouldInterceptClick } from '@/lib/routes';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  /** Ids of the adjacent rules, so prev/next are crawlable links rather than buttons. */
  previousId?: string;
  nextId?: string;
}

export function Navigation({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  previousId,
  nextId,
}: NavigationProps) {
  return (
    <div className="fixed bottom-0 right-0 left-0 md:left-80 z-40 bg-background border-t border-border">
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
        {hasPrevious && previousId ? (
          <Button variant="outline" asChild>
            <a
              href={principlePath(previousId)}
              rel="prev"
              aria-label="Previous principle"
              onClick={(e) => {
                if (!shouldInterceptClick(e)) return;
                e.preventDefault();
                onPrevious();
              }}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
              Previous
            </a>
          </Button>
        ) : (
          <Button variant="outline" disabled aria-label="Previous principle">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            Previous
          </Button>
        )}

        {hasNext && nextId ? (
          <Button asChild>
            <a
              href={principlePath(nextId)}
              rel="next"
              aria-label="Next principle"
              onClick={(e) => {
                if (!shouldInterceptClick(e)) return;
                e.preventDefault();
                onNext();
              }}
            >
              Next
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </a>
          </Button>
        ) : (
          <Button disabled aria-label="Next principle">
            Next
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
