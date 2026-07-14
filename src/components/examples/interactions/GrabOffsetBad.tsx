import { useRef, useState } from 'react';

const CARD_H = 64;
const TRACK_H = 200;

/**
 * The lazy drag: position the card at the pointer. Which silently means
 * "centre the card on the pointer" — so the instant you grab the card's edge,
 * it teleports to put its middle under your finger. The illusion of holding
 * an object dies in frame one, before any release physics gets a chance.
 */
export function GrabOffsetBad() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<number | null>(null);
  const [y, setY] = useState(TRACK_H / 2 - CARD_H / 2);
  const [dragging, setDragging] = useState(false);
  const [jump, setJump] = useState(0);

  const clamp = (v: number) => Math.min(TRACK_H - CARD_H, Math.max(0, v));

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Grab this card by its <span className="text-foreground">top or bottom edge</span> and watch it
          snap its centre to your cursor before it starts following.
        </p>

        <div
          ref={trackRef}
          style={{ height: TRACK_H }}
          className="relative overflow-hidden rounded-md border border-border bg-muted"
        >
          <div
            onPointerDown={(e) => {
              if (pointerRef.current !== null) return;
              const track = trackRef.current;
              if (!track) return;
              pointerRef.current = e.pointerId;
              e.currentTarget.setPointerCapture(e.pointerId);

              const trackTop = track.getBoundingClientRect().top;
              // Where they grabbed is never recorded. The card is simply centred
              // on the pointer — a visible teleport of up to half the card's height.
              const next = clamp(e.clientY - trackTop - CARD_H / 2);
              setJump(Math.abs(next - y));
              setY(next);
              setDragging(true);
            }}
            onPointerMove={(e) => {
              if (pointerRef.current !== e.pointerId) return;
              const trackTop = trackRef.current?.getBoundingClientRect().top ?? 0;
              setY(clamp(e.clientY - trackTop - CARD_H / 2));
            }}
            onPointerUp={() => {
              pointerRef.current = null;
              setDragging(false);
            }}
            onPointerCancel={() => {
              pointerRef.current = null;
              setDragging(false);
            }}
            style={{ transform: `translate3d(0, ${y}px, 0)`, height: CARD_H, touchAction: 'none' }}
            className="absolute inset-x-2 flex cursor-grab select-none items-center rounded-md border border-border bg-card px-4"
          >
            <div>
              <p className="text-sm text-foreground">Drag me by an edge</p>
              <p className="text-xs text-muted-foreground">I will jump to centre myself</p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs" aria-live="polite">
          <span className="text-muted-foreground">Teleport on grab: </span>
          <span className="font-mono text-destructive">{Math.round(jump)}px</span>
          {dragging ? '' : jump > 0 ? ' — the card moved before you did.' : ''}
        </p>
      </div>
      <p className="text-xs text-destructive mt-4">
        Centres the card on the pointer at pointerdown — it visibly teleports out from under your finger
      </p>
    </div>
  );
}
