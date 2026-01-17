import { useEffect, useRef, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { categories } from '../data/principles';
import { Principle, PrincipleCategory } from '../types/principle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SIDEBAR_FOCUS_DELAY_MS,
  SIDEBAR_WIDTH_CLASS,
  SIDEBAR_HEADER_HEIGHT_PX,
} from '@/constants/ui';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  principles: Principle[];
  currentPrincipleId: string;
  onPrincipleSelect: (principleId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  principles,
  currentPrincipleId,
  onPrincipleSelect,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Filter principles based on search query
  const filteredPrinciples = principles.filter((p) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
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
    onClose();
  };

  // Focus trap implementation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !sidebarRef.current) return;

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
    [isOpen, onClose]
  );

  // Manage focus when sidebar opens/closes
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus search input when sidebar opens
      setTimeout(() => searchInputRef.current?.focus(), SIDEBAR_FOCUS_DELAY_MS);
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
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 bottom-0 ${SIDEBAR_WIDTH_CLASS} bg-background z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        inert={!isOpen ? '' : undefined}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Interface Guidelines
          </h2>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close menu"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </Button>
        </div>

        {/* Search input */}
        <div className="p-4 border-b border-border">
          <Input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search principles..."
            aria-label="Search principles"
          />
        </div>

        <nav
          className="overflow-y-auto overscroll-contain"
          style={{ height: `calc(100vh - ${SIDEBAR_HEADER_HEIGHT_PX}px)` }}
        >
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
                  <div className="px-4 py-3 bg-muted">
                    <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                  <ul>
                    {categoryPrinciples.map((principle) => (
                      <li key={principle.id}>
                        <button
                          onClick={() => handlePrincipleClick(principle.id)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                            currentPrincipleId === principle.id
                              ? 'bg-primary/10 text-primary font-medium border-l-4 border-primary'
                              : 'text-foreground border-l-4 border-transparent'
                          }`}
                        >
                          {principle.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
}
