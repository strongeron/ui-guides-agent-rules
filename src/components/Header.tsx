import { Menu } from 'lucide-react';

interface HeaderProps {
  currentIndex: number;
  totalCount: number;
  onMenuToggle: () => void;
}

export function Header({ currentIndex, totalCount, onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="text-sm font-medium text-gray-600">
          {currentIndex + 1} / {totalCount}
        </div>

        <a
          href="https://vercel.com/blog/web-interface-guidelines"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-2 py-1"
        >
          Source
        </a>
      </div>
    </header>
  );
}
