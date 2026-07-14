import { useState } from 'react';
import { Alert02Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function LogicalPropertiesGood() {
  const [rtl, setRtl] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Logical properties: ms / text-start / pe</p>
        <button
          type="button"
          onClick={() => setRtl((v) => !v)}
          aria-pressed={rtl}
          className="rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          dir: {rtl ? 'rtl' : 'ltr'}
        </button>
      </div>

      {/* `lang` is not decorative: it picks the quotes, the hyphenation dictionary,
          the font fallbacks, and the voice a screen reader reads this in. */}
      <div dir={rtl ? 'rtl' : 'ltr'} lang={rtl ? 'ar' : 'en'}>
        <div className="relative flex items-center rounded-lg border border-border bg-card p-3 pe-12">
          <HugeiconsIcon
            icon={Alert02Icon}
            size={20}
            className="shrink-0 text-destructive"
            aria-hidden
          />
          {/* ms-3 = "3 units from where the reading starts", so the gap stays next to the icon. */}
          <div className="ms-3 min-w-0 text-start">
            <p className="truncate text-sm font-medium text-foreground">
              {rtl ? 'فشل النشر إلى الإنتاج' : 'Deploy to production failed'}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {rtl ? 'منذ دقيقتين · الفرع main' : '2 minutes ago · branch main'}
            </p>
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} aria-hidden />
          </button>
        </div>
      </div>

      <p className="text-xs text-success">
        The same row mirrors correctly with zero extra CSS and no RTL stylesheet, because nothing in it
        names a physical edge: <code>ms-3</code> is a gap from the start edge, <code>pe-12</code> reserves
        space at the end edge, <code>end-3</code> pins the dismiss button to the end edge, and{' '}
        <code>text-start</code> aligns the copy to whichever side the reader begins on. The full mapping
        is small — <code>ms/me</code>, <code>ps/pe</code>, <code>start/end</code>,{' '}
        <code>border-s/border-e</code>, <code>text-start/text-end</code> — and costs the same number of
        characters as the broken version.
      </p>
    </div>
  );
}
