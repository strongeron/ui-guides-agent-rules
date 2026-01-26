import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Github01Icon, Search01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  /** Whether sidebar is always visible (desktop/tablet) */
  isDesktop?: boolean;
}

export function Header({ onMenuToggle, searchQuery, onSearchChange, isDesktop = false }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className={`flex items-center h-14 px-4 gap-4 ${isDesktop ? 'pl-80' : ''}`}>
        {/* Left side: hamburger on mobile, logo always */}
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
          <a href="#" className="font-semibold text-foreground whitespace-nowrap">
            Web UI Guide
          </a>
        </div>

        {/* Center: search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search principles..."
              aria-label="Search principles"
              className="pl-9 h-9"
            />
          </div>
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
              href="https://skills.sh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Skills
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
