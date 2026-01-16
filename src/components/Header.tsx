import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  currentIndex: number;
  totalCount: number;
  onMenuToggle: () => void;
}

export function Header({ currentIndex, totalCount, onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <HugeiconsIcon icon={Menu01Icon} size={20} />
        </Button>

        <div className="text-sm font-medium text-gray-600">
          {currentIndex + 1} / {totalCount}
        </div>

        <Button variant="link" asChild>
          <a
            href="https://vercel.com/blog/web-interface-guidelines"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </Button>
      </div>
    </header>
  );
}
