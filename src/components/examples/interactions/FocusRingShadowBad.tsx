import { useState } from 'react';

export function FocusRingShadowBad() {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-xs text-muted-foreground mb-6">
          Tab into the pill. The ring is drawn with <code>outline</code>. The dashed box is the same
          <code> outline</code> as an un-updated Safari (pre-16.4) paints it: a rectangle that ignores the radius.
        </p>

        <div className="flex justify-center py-6">
          <div className="relative">
            {/* Faithful reproduction of the legacy outline box: square corners, hugging the border box. */}
            {focused && (
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-[3px] border-2 border-dashed border-ring"
              />
            )}
            <button
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              // outline for the focus ring: the property that historically squares off rounded corners.
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Rounded button
            </button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Corners of the ring do not follow the pill. On any OS that never got Safari 16.4 the ring is a hard rectangle.
        </p>
      </div>
      <p className="text-xs text-error mt-4">
        <code>outline</code> does not reliably follow <code>border-radius</code> — the ring squares off the pill
      </p>
    </div>
  );
}
