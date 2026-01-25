import { useEffect, useRef, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { categories } from '../data/principles';
import { Principle, PrincipleCategory, PatternSource } from '../types/principle';
import { Button } from '@/components/ui/button';
import { SourceFilter } from './SourceFilter';
import { SIDEBAR_FOCUS_DELAY_MS, SIDEBAR_WIDTH_CLASS } from '@/constants/ui';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  principles: Principle[];
  currentPrincipleId: string;
  onPrincipleSelect: (principleId: string) => void;
  searchQuery: string;
  selectedSources: PatternSource[];
  onSourcesChange: (sources: PatternSource[]) => void;
  availableSources: PatternSource[];
  /** Whether we're on a screen size where sidebar is always visible */
  isDesktop?: boolean;
}

export function Sidebar({
  isOpen,
  onClose,
  principles,
  currentPrincipleId,
  onPrincipleSelect,
  searchQuery,
  selectedSources,
  onSourcesChange,
  availableSources,
  isDesktop = false,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Filter principles based on search query and selected sources
  const filteredPrinciples = principles.filter((p) => {
    // Source filter (empty selection means show all)
    const matchesSource =
      selectedSources.length === 0 ||
      (p.source && selectedSources.includes(p.source));

    // Search filter
    const matchesSearch = (() => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    })();

    return matchesSource && matchesSearch;
  });

  const groupedPrinciples = categories.reduce(
    (acc, category) => {
      acc[category.id] = filteredPrinciples.filter(
        (p) => p.category === category.id
      );
      return acc;
    },
    {} as Record<PrincipleCategory, Principle[]>
  );

  const handlePrincipleClick = (principleId: string) => {
    onPrincipleSelect(principleId);
    // Only close on mobile
    if (!isDesktop) {
      onClose();
    }
  };

  // Focus trap implementation (mobile only)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !sidebarRef.current || isDesktop) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = sidebarRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    },
    [isOpen, onClose, isDesktop]
  );

  // Manage focus when sidebar opens/closes (mobile only)
  useEffect(() => {
    // On desktop, sidebar is always visible - no focus management needed
    if (isDesktop) return;

    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus close button when sidebar opens
      setTimeout(() => closeButtonRef.current?.focus(), SIDEBAR_FOCUS_DELAY_MS);
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to previous element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown, isDesktop]);

  // On desktop, sidebar is always visible
  const isVisible = isDesktop || isOpen;

  return (
    <>
      {/* Overlay - mobile only */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-overlay z-40 transition-opacity md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`
          fixed top-14 bottom-0 ${SIDEBAR_WIDTH_CLASS} bg-background border-r border-border
          transition-[left] duration-300 ease-in-out
          ${isDesktop
            ? 'left-0 z-30 shadow-none'
            : `z-50 shadow-2xl ${isOpen ? 'left-0' : '-left-80'}`
          }
        `}
        aria-label="Navigation menu"
        aria-hidden={!isVisible}
        inert={!isVisible ? '' : undefined}
      >
        {/* Mobile close button */}
        {!isDesktop && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-sm font-medium text-foreground">Navigation</span>
            <Button
              ref={closeButtonRef}
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close menu"
              className="h-8 w-8"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </Button>
          </div>
        )}

        {/* Source filter */}
        <div className="p-4 border-b border-border">
          <SourceFilter
            selectedSources={selectedSources}
            onSourcesChange={onSourcesChange}
            availableSources={availableSources}
          />
        </div>

        <nav className="overflow-y-auto overscroll-contain h-[calc(100%-65px)]">
          {filteredPrinciples.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">No principles found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          ) : (
            categories.map((category) => {
              const categoryPrinciples = groupedPrinciples[category.id];
              if (!categoryPrinciples?.length) return null;

              return (
                <div key={category.id} className="border-b border-border">
                  <div className="px-4 py-2 bg-muted/50">
                    <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      {category.title}
                    </h3>
                  </div>
                  <ul>
                    {categoryPrinciples.map((principle) => (
                      <li key={principle.id}>
                        <Button
                          variant="ghost"
                          onClick={() => handlePrincipleClick(principle.id)}
                          className={`w-full justify-start rounded-none px-4 py-2 h-auto text-sm hover:bg-muted ${
                            currentPrincipleId === principle.id
                              ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                              : 'text-foreground border-l-2 border-transparent'
                          }`}
                        >
                          {principle.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}

          {/* Demos Section */}
          <div className="border-b border-border">
            <div className="px-4 py-2 bg-muted/50">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Demos
              </h3>
            </div>
            <ul>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => handlePrincipleClick('codehike-demo')}
                  className={`w-full justify-start rounded-none px-4 py-2 h-auto text-sm hover:bg-muted ${
                    currentPrincipleId === 'codehike-demo'
                      ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                      : 'text-foreground border-l-2 border-transparent'
                  }`}
                >
                  CodeHike Demo
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
