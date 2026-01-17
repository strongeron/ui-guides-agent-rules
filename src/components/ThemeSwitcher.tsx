import { HugeiconsIcon } from '@hugeicons/react';
import { Sun02Icon, Moon02Icon, Settings02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { useTheme } from '../hooks/useTheme';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const order: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  const icon = theme === 'light'
    ? Sun02Icon
    : theme === 'dark'
    ? Moon02Icon
    : Settings02Icon;

  const label = theme === 'light'
    ? 'Light mode (click to switch)'
    : theme === 'dark'
    ? 'Dark mode (click to switch)'
    : 'System theme (click to switch)';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
    >
      <HugeiconsIcon icon={icon} size={20} />
    </Button>
  );
}
