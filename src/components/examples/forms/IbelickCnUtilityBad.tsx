interface ButtonProps {
  variant?: 'default' | 'destructive';
  className?: string;
  children: React.ReactNode;
}

export function IbelickCnUtilityBad() {
  // Naive class concatenation without conflict resolution
  const Button = ({ variant = 'default', className = '', children }: ButtonProps) => {
    const baseClasses = 'px-4 py-2 rounded-lg font-medium p-4';
    const variantClasses = variant === 'destructive'
      ? 'bg-destructive text-destructive-foreground'
      : 'bg-primary text-primary-foreground';

    // Simple string concatenation - conflicts are not resolved
    const classes = `${baseClasses} ${variantClasses} ${className}`;

    return <button className={classes}>{children}</button>;
  };

  return (
    <div className="space-y-4">
      {/* p-4 from base conflicts with p-2 from className */}
      <Button className="p-2">Conflicting Padding</Button>
      <Button variant="destructive">Destructive</Button>
      <p className="text-xs text-destructive mt-4">
        String concatenation doesn't resolve p-4 vs p-2 conflicts
      </p>
    </div>
  );
}
