import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'default' | 'destructive';
  className?: string;
  children: React.ReactNode;
}

export function IbelickCnUtilityGood() {
  // Using cn() utility for intelligent class merging
  const Button = ({ variant = 'default', className, children }: ButtonProps) => {
    return (
      <button
        className={cn(
          'px-4 py-2 rounded-lg font-medium p-4',
          variant === 'destructive'
            ? 'bg-destructive text-destructive-foreground'
            : 'bg-primary text-primary-foreground',
          className // cn() intelligently resolves conflicts
        )}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* p-2 from className correctly overrides p-4 from base */}
      <Button className="p-2">Override Padding</Button>
      <Button variant="destructive">Destructive</Button>
      <p className="text-xs text-success mt-4">
        cn() resolves conflicts: p-2 correctly overrides p-4
      </p>
    </div>
  );
}
