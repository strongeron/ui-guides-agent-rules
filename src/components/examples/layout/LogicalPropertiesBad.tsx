import { useState } from 'react';
import { Alert02Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function LogicalPropertiesBad() {
  const [rtl, setRtl] = useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Physical properties: ml / text-left / pr</p>
        <button
          type="button"
          onClick={() => setRtl((v) => !v)}
          aria-pressed={rtl}
          className="rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          dir: {rtl ? 'rtl' : 'ltr'}
        </button>
      </div>

      {/* No `lang`, so the browser has no idea which quotes or hyphenation to use either. */}
      <div dir={rtl ? 'rtl' : 'ltr'}>
        <div className="relative flex items-center rounded-lg border border-border bg-card p-3 pr-12">
          <HugeiconsIcon
            icon={Alert02Icon}
            size={20}
            className="shrink-0 text-destructive"
            aria-hidden
          />
          {/* ml-3 = "3 units from the LEFT of the screen", not "from the icon". */}
          <div className="ml-3 min-w-0 text-left">
            <p className="truncate text-sm font-medium text-foreground">
              {rtl ? 'فشل النشر إلى الإنتاج' : 'Deploy to production failed'}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {rtl ? 'منذ دقيقتين · الفرع main' : '2 minutes ago · branch main'}
            </p>
          </div>
          {/* Pinned to the right, whatever the reading direction. */}
          <button
            type="button"
            aria-label="Dismiss"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} aria-hidden />
          </button>
        </div>
      </div>

      <p className="text-xs text-destructive">
        Flip to RTL. The flex order mirrors, but every hardcoded left and right stays put: the{' '}
        <code>ml-3</code> gap is now on the far side of the text so the icon detaches from the words it
        belongs to, the <code>pr-12</code> reserve is stranded on the wrong edge and the dismiss button —
        pinned with <code>right-3</code> — lands on top of the icon, and the copy is still ragged-left in
        a language that is read right-to-left.
      </p>
    </div>
  );
}
