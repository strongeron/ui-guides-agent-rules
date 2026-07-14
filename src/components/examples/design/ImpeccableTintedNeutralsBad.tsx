import type { CSSProperties } from 'react';

const PAPER = '#ffffff';
const INK = '#000000';
const LINE = '#808080';

const NEUTRALS = { '--paper': PAPER, '--ink': INK, '--line': LINE } as CSSProperties;

export function ImpeccableTintedNeutralsBad() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Brand color + neutrals</p>

      <div className="flex items-stretch gap-3" style={NEUTRALS}>
        <div className="w-16 shrink-0 rounded-lg bg-teal-500" aria-hidden="true" />

        <div className="flex-1 rounded-lg border border-[var(--line)] bg-[var(--paper)] p-4">
          <p className="text-sm font-semibold text-[var(--ink)]">Invoice INV-1284</p>
          <p className="mt-1 text-sm text-[var(--line)]">
            Pure {PAPER} surface, pure {INK} text, {LINE} border — zero chroma anywhere.
          </p>
        </div>
      </div>

      <p className="text-xs text-error">
        The teal brand swatch and the card look like they came from two different products. Absolute
        black and white are the only values with no hue relationship to anything, so the neutrals read as
        detached instead of as the brand&apos;s quiet register.
      </p>
    </div>
  );
}
