import { HugeiconsIcon } from '@hugeicons/react';
import { Sun02Icon, Moon02Icon } from '@hugeicons/core-free-icons';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '../hooks/useTheme';

export function ThemeSwitcher() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <HugeiconsIcon
        icon={Sun02Icon}
        size={16}
        className={isDark ? 'text-muted-foreground' : 'text-foreground'}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      />
      <HugeiconsIcon
        icon={Moon02Icon}
        size={16}
        className={isDark ? 'text-foreground' : 'text-muted-foreground'}
        aria-hidden="true"
      />
    </div>
  );
}
