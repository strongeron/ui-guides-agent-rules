import { useRef, useState } from 'react';

const MENU = [
  { id: 'products', label: 'Products', items: ['Analytics', 'Hosting', 'Storage'] },
  { id: 'pricing', label: 'Pricing', items: ['Plans', 'Enterprise', 'Calculator'] },
  { id: 'docs', label: 'Docs', items: ['Guides', 'API', 'Changelog'] },
];

export function MenuPredictionConeGood() {
  const [active, setActive] = useState<string>('products');
  const timer = useRef<number | null>(null);

  const cancel = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // Grace window: crossing a sibling only *schedules* a switch. Reaching the open
  // submenu cancels it — so a pointer aimed at the submenu keeps it. This is the
  // delay approximation of the safe-triangle / prediction cone.
  const scheduleSwitch = (id: string) => {
    if (id === active) return cancel();
    cancel();
    timer.current = window.setTimeout(() => {
      setActive(id);
      timer.current = null;
    }, 160);
  };

  const activeMenu = MENU.find((m) => m.id === active);

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-3">
        <ul className="w-28 shrink-0 rounded-lg border border-border bg-card p-1">
          {MENU.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onMouseEnter={() => scheduleSwitch(m.id)}
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
        <ul
          onMouseEnter={cancel}
          className="min-h-[8.5rem] flex-1 rounded-lg border border-border bg-card p-1"
        >
          {activeMenu?.items.map((it) => (
            <li key={it}>
              <button type="button" className="w-full rounded px-3 py-2 text-left text-sm hover:bg-muted">
                {it}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-xs text-success">
        The same diagonal move now lands: entering the submenu cancels the pending sibling switch.
      </p>
    </div>
  );
}
