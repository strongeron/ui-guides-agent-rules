import { HugeiconsIcon } from '@hugeicons/react';
import { Sun02Icon, Moon02Icon } from '@hugeicons/core-free-icons';
import { useTheme } from '../hooks/useTheme';

export function ThemeSwitcher() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
      className="relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full border border-border bg-muted/60 transition-colors hover:bg-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Target icon shown on the empty side of the track */}
      <span
        className={`pointer-events-none absolute left-[8px] text-muted-foreground transition-opacity duration-200 ${
          isDark ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <HugeiconsIcon icon={Sun02Icon} size={14} aria-hidden="true" />
      </span>
      <span
        className={`pointer-events-none absolute right-[8px] text-muted-foreground transition-opacity duration-200 ${
          isDark ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <HugeiconsIcon icon={Moon02Icon} size={14} aria-hidden="true" />
      </span>

      {/* Thumb carries the current theme's icon */}
      <span
        className={`pointer-events-none z-10 flex size-[22px] items-center justify-center rounded-full border border-border/50 bg-background text-foreground shadow-sm transition-transform duration-200 ${
          isDark ? 'translate-x-[27px]' : 'translate-x-[3px]'
        }`}
      >
        <HugeiconsIcon icon={isDark ? Moon02Icon : Sun02Icon} size={13} aria-hidden="true" />
      </span>
    </button>
  );
}
