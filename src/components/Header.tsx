import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from './ThemeSwitcher';

/** Official GitHub mark, filled (solid) — HUGEICONS free only ships a stroke variant. */
function GithubMarkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

interface HeaderProps {
  onMenuToggle: () => void;
  /** Open the ⌘K command palette */
  onSearchClick: () => void;
  /** Navigate to the Sources page */
  onSourcesClick: () => void;
  /** Whether sidebar is always visible (desktop/tablet) */
  isDesktop?: boolean;
}

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');

export function Header({ onMenuToggle, onSearchClick, onSourcesClick, isDesktop = false }: HeaderProps) {
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
              className="h-9 w-9 hover:bg-muted hover:text-foreground"
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
            className="group flex w-full items-center gap-2 h-9 rounded-lg border border-border bg-muted/60 pl-3 pr-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:border-primary/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
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
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 hover:bg-muted hover:text-foreground">
            <a
              href="https://github.com/strongeron/ui-guides"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <GithubMarkIcon size={18} />
            </a>
          </Button>
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={onSourcesClick}
            className="hidden sm:inline-flex hover:bg-muted hover:text-foreground"
          >
            Sources
          </Button>
        </div>
      </div>
    </header>
  );
}
