import { useState } from 'react';

const MENU = [
  { id: 'products', label: 'Products', items: ['Analytics', 'Hosting', 'Storage'] },
  { id: 'pricing', label: 'Pricing', items: ['Plans', 'Enterprise', 'Calculator'] },
  { id: 'docs', label: 'Docs', items: ['Guides', 'API', 'Changelog'] },
];

export function MenuPredictionConeBad() {
  const [active, setActive] = useState<string>('products');
  const activeMenu = MENU.find((m) => m.id === active);

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-3">
        <ul className="w-28 shrink-0 rounded-lg border border-border bg-card p-1">
          {MENU.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                // Bug: any sibling the pointer crosses on its way to the submenu
                // instantly hijacks it, so diagonal travel never lands.
                onMouseEnter={() => setActive(m.id)}
                className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm ${
                  active === m.id ? 'bg-muted font-medium' : 'text-muted-foreground'
                }`}
              >
                {m.label}
                <span aria-hidden="true">›</span>
              </button>
            </li>
          ))}
        </ul>
        <ul className="min-h-[8.5rem] flex-1 rounded-lg border border-border bg-card p-1">
          {activeMenu?.items.map((it) => (
            <li key={it}>
              <button type="button" className="w-full rounded px-3 py-2 text-left text-sm hover:bg-muted">
                {it}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Reach for “Analytics”: moving diagonally crosses Pricing/Docs, which swap the submenu out from under you.
      </p>
    </div>
  );
}
