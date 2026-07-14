import { useEffect, useRef } from 'react';

export function AutofocusGood() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only autofocus on desktop (pointer: fine indicates mouse/trackpad)
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (isDesktop && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Search</h3>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search..."
          className="w-full px-3 py-2 border border-border rounded-lg text-base focus:outline-hidden focus:ring-2 focus:ring-ring"
        />
        <div className="mt-3 bg-success/10 border border-success/20 rounded-lg p-3">
          <code className="text-xs text-success-foreground font-mono block whitespace-pre">
{`// Conditional autofocus
const isDesktop =
  matchMedia('(pointer: fine)').matches;
if (isDesktop) input.focus();`}
          </code>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Desktop: autofocus saves a click. Mobile: no autofocus, no keyboard jump.
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        Autofocus only on desktop, skip on mobile
      </p>
    </div>
  );
}
