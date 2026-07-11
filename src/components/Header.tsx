import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Github01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  onMenuToggle: () => void;
  /** Open the ⌘K command palette */
  onSearchClick: () => void;
  /** Whether sidebar is always visible (desktop/tablet) */
  isDesktop?: boolean;
}

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');

export function Header({ onMenuToggle, onSearchClick, isDesktop = false }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center h-14 px-4">
        {/* Left side: logo area - matches sidebar width on desktop */}
        <div className={`flex items-center gap-2 flex-shrink-0 ${isDesktop ? 'w-76' : ''}`}>
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
          <a href="/" className="font-semibold text-foreground whitespace-nowrap">
            UI Guides
          </a>
        </div>

        {/* Search trigger - opens the ⌘K command palette */}
        <div className="flex-1 max-w-xl mx-4">
          <button
            type="button"
            onClick={onSearchClick}
            aria-label={`Search rules (${isMac ? 'Command' : 'Control'} K)`}
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            className="group flex w-full items-center gap-2 h-9 rounded-lg border border-border bg-muted/60 pl-3 pr-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          >
            <HugeiconsIcon icon={Search01Icon} size={16} aria-hidden="true" />
            <span className="flex-1 text-left truncate">Search rules…</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[11px] font-medium leading-none text-muted-foreground transition-colors group-hover:border-primary/40">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
        </div>

        {/* Right side: actions - pushed to right edge */}
        <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9">
            <a
              href="https://github.com/strongeron/ui-guides"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <HugeiconsIcon icon={Github01Icon} size={18} />
            </a>
          </Button>
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <a href="https://skills.sh/" target="_blank" rel="noopener noreferrer">
              Skills
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
