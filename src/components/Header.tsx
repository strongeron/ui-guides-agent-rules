import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  currentIndex: number;
  totalCount: number;
  onMenuToggle: () => void;
  /** Whether sidebar is always visible (desktop/tablet) */
  isDesktop?: boolean;
}

export function Header({ currentIndex, totalCount, onMenuToggle, isDesktop = false }: HeaderProps) {
  return (
    <header className={`fixed top-0 right-0 z-50 bg-background border-b border-border ${isDesktop ? 'left-80' : 'left-0'}`}>
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
        {/* Hamburger menu - mobile only */}
        {!isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </Button>
        )}

        <div className="text-sm font-medium text-muted-foreground">
          {currentIndex + 1} / {totalCount}
        </div>

        <div className="flex items-center gap-1">
          <ThemeSwitcher />
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
      </div>
    </header>
  );
}
