import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type PopoverElement = HTMLDivElement & {
  showPopover?: () => void;
  hidePopover?: () => void;
};

/**
 * Good: the card still clips (the header keeps its rounded corner), but the
 * menu no longer lives inside the clip. `popover="auto"` promotes it into the
 * browser's top layer, which sits outside the whole DOM stacking/clipping tree
 * — no ancestor `overflow: hidden` can reach it, and no portal is needed.
 *
 * React 18's types don't know the popover attributes yet, so we set them on the
 * element imperatively; the API itself is plain HTML.
 */
export function ImpeccableClippedOverflowGood() {
  const [open, setOpen] = useState(true);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<PopoverElement>(null);

  const rows = [
    { name: 'invoice-2026-04.pdf', size: '182 KB' },
    { name: 'contract-signed.pdf', size: '1.1 MB' },
  ];

  // Opt the menu into the top layer, and keep React in sync with light-dismiss
  // (Esc / outside click), which the browser handles for us.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    menu.setAttribute('popover', 'auto');

    const onToggle = () => setOpen(menu.matches(':popover-open'));
    menu.addEventListener('toggle', onToggle);
    return () => menu.removeEventListener('toggle', onToggle);
  }, []);

  // Anchor it to the trigger, then show/hide it.
  useLayoutEffect(() => {
    const menu = menuRef.current;
    const trigger = triggerRef.current;
    if (!menu || !trigger) return;

    const place = () => {
      const rect = trigger.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.right - 144 });
    };

    if (!open) {
      menu.hidePopover?.();
      return;
    }

    place();
    menu.showPopover?.();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open]);

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Still overflow-hidden — the corner clip is a real requirement */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-md">
        <div className="border-b border-border bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
          Documents &mdash; <code>overflow-hidden</code>
        </div>

        {rows.map((row, i) => (
          <div
            key={row.name}
            className="flex items-center justify-between border-b border-border px-4 py-3 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.size}</p>
            </div>

            <button
              type="button"
              ref={i === rows.length - 1 ? triggerRef : undefined}
              aria-expanded={i === rows.length - 1 ? open : false}
              onClick={() => i === rows.length - 1 && setOpen((v) => !v)}
              className="rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              &hellip;
            </button>
          </div>
        ))}
      </div>

      {/* Rendered outside the clip, promoted to the top layer by the popover attribute */}
      <div
        ref={menuRef}
        style={{
          // The UA sheet centers popovers with `inset: 0; margin: auto` — override
          // all four sides explicitly so our anchored top/left actually win.
          position: 'fixed',
          top: pos.top,
          left: pos.left,
          right: 'auto',
          bottom: 'auto',
          margin: 0,
        }}
        className="w-36 rounded-lg border border-border bg-card py-1 shadow-lg"
      >
        <div className="px-3 py-1.5 text-sm text-foreground">Rename</div>
        <div className="px-3 py-1.5 text-sm text-foreground">Duplicate</div>
        <div className="px-3 py-1.5 text-sm text-foreground">Download</div>
        <div className="px-3 py-1.5 text-sm text-error">Delete</div>
      </div>

      <p className="text-xs text-success">
        Same card, same <code>overflow-hidden</code>. The menu escapes because{' '}
        <code>popover</code> promotes it into the top layer &mdash; above every clipping ancestor,
        with Esc and outside-click dismissal for free.
      </p>
    </div>
  );
}
