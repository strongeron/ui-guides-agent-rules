import { X } from 'lucide-react';
import { categories } from '../data/principles';
import { Principle, PrincipleCategory } from '../types/principle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  principles: Principle[];
  currentPrincipleId: string;
  onPrincipleSelect: (principleId: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  principles,
  currentPrincipleId,
  onPrincipleSelect,
}: SidebarProps) {
  const groupedPrinciples = categories.reduce((acc, category) => {
    acc[category.id] = principles.filter((p) => p.category === category.id);
    return acc;
  }, {} as Record<PrincipleCategory, Principle[]>);

  const handlePrincipleClick = (principleId: string) => {
    onPrincipleSelect(principleId);
    onClose();
  };

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
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Interface Guidelines
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100vh-65px)]">
          {categories.map((category) => {
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
          })}
        </nav>
      </aside>
    </>
  );
}
