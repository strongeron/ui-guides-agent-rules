export function VisualFirstBad() {
  return (
    <div className="w-full max-w-md p-6 bg-card rounded-lg">
      <h3 className="text-sm font-medium mb-4 text-foreground">Our Features</h3>
      <div className="space-y-4">
        {/* Feature 1 - text heavy */}
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-muted rounded flex-shrink-0 flex items-center justify-center text-xs text-muted-foreground">
            1
          </div>
          <div>
            <h4 className="text-xs font-medium text-foreground">Lightning Fast Performance</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Our platform utilizes advanced caching mechanisms and optimized
              algorithms to deliver content faster than ever before. Experience
              sub-second load times and seamless navigation.
            </p>
          </div>
        </div>
        {/* Feature 2 - text heavy */}
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-muted rounded flex-shrink-0 flex items-center justify-center text-xs text-muted-foreground">
            2
          </div>
          <div>
            <h4 className="text-xs font-medium text-foreground">Enterprise Security</h4>
            <p className="text-xs text-muted-foreground mt-1">
              With end-to-end encryption, SOC 2 compliance, and regular
              penetration testing, your data is protected by industry-leading
              security measures and protocols.
            </p>
          </div>
        </div>
        {/* Feature 3 - text heavy */}
        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 bg-muted rounded flex-shrink-0 flex items-center justify-center text-xs text-muted-foreground">
            3
          </div>
          <div>
            <h4 className="text-xs font-medium text-foreground">Seamless Integration</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Connect with over 100 popular tools and services. Our robust API
              and pre-built connectors make integration effortless for your
              existing workflow.
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-destructive mt-4">
        Walls of text with tiny icons as afterthoughts - visuals are subordinate
      </p>
    </div>
  );
}
