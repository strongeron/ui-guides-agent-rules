export function ScrollInteractionsBad() {
  const features = [
    {
      title: 'Lightning Fast',
      description: 'Built for speed with optimized performance',
      icon: '⚡',
    },
    {
      title: 'Secure by Default',
      description: 'Enterprise-grade security out of the box',
      icon: '🔒',
    },
    {
      title: 'Scale Infinitely',
      description: 'Grow without limits or constraints',
      icon: '📈',
    },
    {
      title: 'Always Available',
      description: '99.99% uptime guaranteed worldwide',
      icon: '🌍',
    },
  ];

  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Features</h3>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-4 bg-muted rounded-lg border border-border"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl" role="img" aria-hidden="true">
                {feature.icon}
              </span>
              <div>
                <h4 className="font-medium text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-destructive mt-4">
        All cards visible immediately with no scroll response - static and forgettable
      </p>
    </div>
  );
}
