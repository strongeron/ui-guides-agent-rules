import { useState, type KeyboardEvent } from 'react';

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

// Where the letter "k" physically sits, the way navigator.keyboard.getLayoutMap() would tell you.
const homeOf = (layout: Layout) => {
  const map = layout === 'dvorak' ? DVORAK : layout === 'azerty' ? AZERTY : {};
  const found = Object.entries(map).find(([, char]) => char === 'k');
  return found ? found[0] : 'KeyK';
};

const detectApple = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);

export function LocaleKeyboardShortcutsGood() {
  const [layout, setLayout] = useState<Layout>('qwerty');
  const [isApple, setIsApple] = useState(detectApple);
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<{ code: string; printed: string; matched: boolean } | null>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab' || (!e.ctrlKey && !e.metaKey)) return;

    // Platform-correct modifier, and match the letter the layout actually produces.
    const modifier = isApple ? e.metaKey : e.ctrlKey;
    const printed = prints(layout, e.code, e.key.toLowerCase());
    const matched = modifier && printed === 'k';
    if (matched) {
      e.preventDefault();
      setOpen(true);
    }
    setLast({ code: e.code, printed, matched });
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3 rounded-lg border border-border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <label className="flex items-center gap-1">
            Layout
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
          <label className="flex items-center gap-1">
            Platform
            <select
              value={isApple ? 'apple' : 'other'}
              onChange={(e) => setIsApple(e.target.value === 'apple')}
              className="rounded-md border border-border bg-muted px-2 py-1 text-foreground"
            >
              <option value="apple">macOS</option>
              <option value="other">Windows / Linux</option>
            </select>
          </label>
        </div>

        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="rounded-md border border-border bg-muted p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div className="mb-2 text-xs text-muted-foreground">
            Focus here, then press the shortcut shown on the chip.
          </div>
          <div className="flex items-center justify-between text-sm text-foreground">
            <span>Command palette</span>
            <span className="flex gap-1">
              <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-xs">
                {isApple ? '⌘' : 'Ctrl'}
              </kbd>
              <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-xs">K</kbd>
            </span>
          </div>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <div>
            on {layout}, <code>k</code> is printed by physical key <code>{homeOf(layout)}</code>
          </div>
          {last && (
            <>
              <div>
                physical key <code>{last.code}</code> · prints{' '}
                <code>&ldquo;{last.printed}&rdquo;</code>
              </div>
              <div className={last.matched ? 'text-success' : 'text-muted-foreground'}>
                {last.matched ? 'palette opened — the key that prints "k" worked' : 'no match'}
              </div>
            </>
          )}
        </div>

        {open && (
          <div className="rounded-md border border-border bg-muted p-2 text-xs text-foreground">
            Command palette{' '}
            <button type="button" className="underline" onClick={() => setOpen(false)}>
              close
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-success">
        The modifier symbol comes from the platform (⌘ on Apple, Ctrl elsewhere) and the binding
        matches the character the layout produces, not a QWERTY key position. Switch to Dvorak and
        press the key that prints <code>k</code>: it opens, exactly as the chip promised.
      </p>
    </div>
  );
}
