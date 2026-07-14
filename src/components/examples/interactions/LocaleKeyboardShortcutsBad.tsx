import { useState, type KeyboardEvent } from 'react';

// What each physical key (event.code) actually prints on a given layout.
const DVORAK: Record<string, string> = {
  KeyQ: "'", KeyW: ',', KeyE: '.', KeyR: 'p', KeyT: 'y', KeyY: 'f', KeyU: 'g', KeyI: 'c',
  KeyO: 'r', KeyP: 'l', KeyA: 'a', KeyS: 'o', KeyD: 'e', KeyF: 'u', KeyG: 'i', KeyH: 'd',
  KeyJ: 'h', KeyK: 't', KeyL: 'n', KeyZ: ';', KeyX: 'q', KeyC: 'j', KeyV: 'k', KeyB: 'x',
  KeyN: 'b', KeyM: 'm',
};
const AZERTY: Record<string, string> = { KeyA: 'q', KeyQ: 'a', KeyW: 'z', KeyZ: 'w', KeyM: ',' };

type Layout = 'qwerty' | 'azerty' | 'dvorak';

const prints = (layout: Layout, code: string, fallback: string) => {
  if (layout === 'dvorak') return DVORAK[code] ?? fallback;
  if (layout === 'azerty') return AZERTY[code] ?? fallback;
  return fallback;
};

export function LocaleKeyboardShortcutsBad() {
  const [layout, setLayout] = useState<Layout>('qwerty');
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<{ code: string; printed: string; matched: boolean } | null>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab' || (!e.ctrlKey && !e.metaKey)) return;

    // Bound to a physical key position, and only to Ctrl — no platform awareness.
    const matched = e.ctrlKey && e.code === 'KeyK';
    if (matched) {
      e.preventDefault();
      setOpen(true);
    }
    setLast({
      code: e.code,
      printed: prints(layout, e.code, e.key.toLowerCase()),
      matched,
    });
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Simulated layout
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as Layout)}
            className="rounded-md border border-border bg-muted px-2 py-1 text-foreground"
          >
            <option value="qwerty">QWERTY</option>
            <option value="azerty">AZERTY</option>
            <option value="dvorak">Dvorak</option>
          </select>
        </label>

        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="rounded-md border border-border bg-muted p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div className="mb-2 text-xs text-muted-foreground">
            Focus here, then hold Ctrl (or ⌘) and press a letter.
          </div>
          <div className="flex items-center justify-between text-sm text-foreground">
            <span>Command palette</span>
            {/* Hardcoded, never platform-aware. */}
            <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-xs">Ctrl+K</kbd>
          </div>
        </div>

        {last && (
          <div className="space-y-1 text-xs tabular-nums text-muted-foreground">
            <div>
              physical key <code>{last.code}</code> · prints{' '}
              <code>&ldquo;{last.printed}&rdquo;</code> on {layout}
            </div>
            <div className={last.matched ? 'text-error' : 'text-muted-foreground'}>
              {last.matched
                ? `palette opened — but you had to press the key that prints "${last.printed}"`
                : 'no match'}
            </div>
          </div>
        )}

        {open && (
          <div className="rounded-md border border-border bg-muted p-2 text-xs text-foreground">
            Command palette <button type="button" className="underline" onClick={() => setOpen(false)}>close</button>
          </div>
        )}
      </div>
      <p className="text-xs text-error">
        The chip is a hardcoded string and the binding is a physical key position (
        <code>event.code === &apos;KeyK&apos;</code>). Switch to Dvorak: the key that opens the
        palette is the one that prints <code>t</code>, while the key printing <code>k</code> does
        nothing. On a Mac the chip still says Ctrl, where every other app says ⌘.
      </p>
    </div>
  );
}
