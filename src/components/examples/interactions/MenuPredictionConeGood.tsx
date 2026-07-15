import { useRef, useState } from 'react';

const MENU = [
  { id: 'products', label: 'Products', items: ['Analytics', 'Hosting', 'Storage'] },
  { id: 'pricing', label: 'Pricing', items: ['Plans', 'Enterprise', 'Calculator'] },
  { id: 'docs', label: 'Docs', items: ['Guides', 'API', 'Changelog'] },
];

export function MenuPredictionConeGood() {
  const [active, setActive] = useState<string>('products');
  const [showCone, setShowCone] = useState(false);
  const [cone, setCone] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  const cancel = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // Grace window: crossing a sibling only *schedules* a switch; reaching the open submenu
  // cancels it. The shaded triangle below visualises the safe region this approximates.
  const scheduleSwitch = (id: string) => {
    if (id === active) return cancel();
    cancel();
    timer.current = window.setTimeout(() => {
      setActive(id);
      timer.current = null;
    }, 160);
  };

  const onMove = (e: React.MouseEvent) => {
    if (!showCone || !wrapRef.current || !panelRef.current) return;
    const wr = wrapRef.current.getBoundingClientRect();
    const pr = panelRef.current.getBoundingClientRect();
    const x = e.clientX - wr.left;
    const y = e.clientY - wr.top;
    const left = pr.left - wr.left;
    // Apex at the cursor, base along the submenu's near (left) edge.
    setCone(`${x},${y} ${left},${pr.top - wr.top} ${left},${pr.bottom - wr.top}`);
  };

  const activeMenu = MENU.find((m) => m.id === active);

  return (
    <div className="w-full max-w-sm">
      <label className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={showCone}
          onChange={(e) => {
            setShowCone(e.target.checked);
            if (!e.target.checked) setCone(null);
          }}
          className="size-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        />
        Show the safe triangle
      </label>

      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={() => setCone(null)}
        className="relative flex gap-3"
      >
        {showCone && cone && (
          <svg className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible" aria-hidden="true">
            <polygon points={cone} className="fill-primary/15 stroke-primary/60" strokeWidth={1} />
          </svg>
        )}
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
          ref={panelRef}
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
        The same diagonal move now lands: while your pointer stays in the shaded triangle (aimed at the submenu),
        sibling hovers are held off.
      </p>
    </div>
  );
}
