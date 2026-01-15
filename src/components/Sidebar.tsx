import { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { categories } from '../data/principles';
import { Principle, PrincipleCategory } from '../types/principle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      setTimeout(() => searchInputRef.current?.focus(), 100);
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
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        inert={!isOpen ? '' : undefined}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Interface Guidelines
          </h2>
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search input */}
        <div className="p-4 border-b border-gray-200">
          <Input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search principles..."
            aria-label="Search principles"
          />
        </div>

        <nav className="overflow-y-auto overscroll-contain h-[calc(100vh-130px)]">
          {filteredPrinciples.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p className="text-sm">No principles found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          ) : (
            categories.map((category) => {
              const categoryPrinciples = groupedPrinciples[category.id];
              if (!categoryPrinciples?.length) return null;

              return (
                <div key={category.id} className="border-b border-gray-100">
                  <div className="px-4 py-3 bg-gray-50">
                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {category.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {category.description}
                    </p>
                  </div>
                  <ul>
                    {categoryPrinciples.map((principle) => (
                      <li key={principle.id}>
                        <button
                          onClick={() => handlePrincipleClick(principle.id)}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${
                            currentPrincipleId === principle.id
                              ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600'
                              : 'text-gray-700 border-l-4 border-transparent'
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
