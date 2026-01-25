export function GridBreakingBad() {
  const features = [
    {
      icon: '🚀',
      title: 'Fast Performance',
      description: 'Optimized for speed and efficiency across all devices'
    },
    {
      icon: '🔒',
      title: 'Secure by Default',
      description: 'Enterprise-grade security built into every layer'
    },
    {
      icon: '⚡',
      title: 'Easy Integration',
      description: 'Connect with your existing tools in minutes'
    }
  ];

  return (
    <div className="w-full max-w-lg p-6 bg-card rounded-lg">
      <h3 className="text-sm font-medium text-center mb-4">Our Features</h3>
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-4 bg-muted rounded-lg text-center"
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h4 className="text-xs font-medium mb-1">{feature.title}</h4>
            <p className="text-[10px] text-muted-foreground leading-tight">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-destructive mt-4">
        Rigid 3-column grid is predictable and forgettable
      </p>
    </div>
  );
}
