import { useEffect, useState } from 'react';

export function FlexOverMeasurementGood() {
  const [label, setLabel] = useState('...');

  // Same late-arriving content as the bad example.
  useEffect(() => {
    const timer = setTimeout(() => setLabel('310 GB of 500 GB'), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm font-medium text-foreground mb-3">Storage used</p>
        <div className="h-16">
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[62%] rounded-full bg-primary" />
          </div>
          {/* The grid does the arithmetic: the column boundary IS the 62% mark, and
              -translate-x-1/2 centers the label on it whatever the label says. */}
          <div className="grid grid-cols-[62fr_38fr]">
            <div className="flex flex-col items-end">
              <div className="h-5 w-px bg-foreground/40" />
              <span className="mt-2 translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-muted px-2 py-1 text-xs text-foreground">
                {label}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-success mt-4">
        Pure grid + transform: correct on the very first paint, still correct when the label grows,
        and it tracks resize for free with no measurement code.
      </p>
    </div>
  );
}
