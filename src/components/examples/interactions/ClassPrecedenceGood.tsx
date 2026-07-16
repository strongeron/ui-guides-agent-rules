import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'default' | 'large';
  className?: string;
}

function MergedButton({ variant = 'default', className }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm',
        variant === 'large' && 'px-6 py-3 text-base',
        className
      )}
    >
      {variant === 'large' ? 'Large Button' : 'Default'}
    </button>
  );
}

export function ClassPrecedenceGood() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Using cn() / tailwind-merge</h4>
        <div className="flex flex-wrap items-center gap-3">
          <MergedButton />
          <MergedButton variant="large" />
          <MergedButton className="bg-secondary text-secondary-foreground" />
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code>{`cn('px-4', variant && 'px-6', className)`}</code>
        </div>
      </div>
      <p className="text-xs text-success">
        tailwind-merge intelligently resolves conflicting utilities
      </p>
    </div>
  );
}
