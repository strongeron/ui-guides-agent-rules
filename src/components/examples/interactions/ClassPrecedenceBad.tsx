interface ButtonProps {
  variant?: 'default' | 'large';
  className?: string;
}

function StringConcatButton({ variant = 'default', className }: ButtonProps) {
  const baseClasses = 'px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm';
  const variantClasses = variant === 'large' ? 'px-6 py-3 text-base' : '';

  // This can cause conflicts!
  return (
    <button className={`${baseClasses} ${variantClasses} ${className || ''}`}>
      {variant === 'large' ? 'Large Button' : 'Default'}
    </button>
  );
}

export function ClassPrecedenceBad() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">String Concatenation</h4>
        <div className="flex flex-wrap items-center gap-3">
          <StringConcatButton />
          <StringConcatButton variant="large" />
          <StringConcatButton className="bg-secondary text-secondary-foreground" />
        </div>
        <div className="mt-4 bg-muted rounded p-3 font-mono text-xs">
          <code className="text-error">{`\`\${base} \${variant} \${className}\``}</code>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          px-4 and px-6 both exist - which wins depends on CSS source order
        </p>
      </div>
      <p className="text-xs text-error">
        String concatenation doesn't resolve class conflicts
      </p>
    </div>
  );
}
