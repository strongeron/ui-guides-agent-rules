import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Github01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  onMenuToggle: () => void;
  /** Whether sidebar is always visible (desktop/tablet) */
  isDesktop?: boolean;
}

export function Header({ onMenuToggle, isDesktop = false }: HeaderProps) {
  return (
    <header className={`fixed top-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border ${isDesktop ? 'left-80' : 'left-0'}`}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left side: hamburger on mobile */}
        <div className="flex items-center gap-2">
          {!isDesktop && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
              className="h-9 w-9"
            >
              <HugeiconsIcon icon={Menu01Icon} size={18} />
            </Button>
          )}
        </div>

        {/* Right side: actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <a
              href="https://github.com/strongeron/web-ui_guide_react"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <HugeiconsIcon icon={Github01Icon} size={18} />
            </a>
          </Button>
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
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
