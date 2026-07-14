import { useRef, useState } from 'react';

const CARD_H = 64;
const TRACK_H = 200;

/**
 * Two lines and no library: record the pointer's offset *within* the element at
 * pointerdown, then subtract it on every move. The card stays glued to the exact
 * spot you took hold of, and the first frame of the drag moves nothing at all.
 */
export function GrabOffsetGood() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<number | null>(null);
  const grabOffsetRef = useRef(0);
  const [y, setY] = useState(TRACK_H / 2 - CARD_H / 2);
  const [dragging, setDragging] = useState(false);
  const [grabOffset, setGrabOffset] = useState<number | null>(null);
  const [jump, setJump] = useState(0);

  const clamp = (v: number) => Math.min(TRACK_H - CARD_H, Math.max(0, v));

  return (
    <div className="w-full max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">
          Grab this card <span className="text-foreground">anywhere</span> — an edge, a corner, the middle.
          It stays exactly where you took hold of it.
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
              // Pointer capture keeps the stream flowing when the pointer leaves the card.
              e.currentTarget.setPointerCapture(e.pointerId);

              // Where inside the card did they grab? Remember it.
              const rect = e.currentTarget.getBoundingClientRect();
              grabOffsetRef.current = e.clientY - rect.top;
              setGrabOffset(grabOffsetRef.current);

              const trackTop = track.getBoundingClientRect().top;
              const next = clamp(e.clientY - trackTop - grabOffsetRef.current);
              setJump(Math.abs(next - y)); // zero, by construction
              setY(next);
              setDragging(true);
            }}
            onPointerMove={(e) => {
              if (pointerRef.current !== e.pointerId) return;
              const trackTop = trackRef.current?.getBoundingClientRect().top ?? 0;
              // Subtract the grab offset on every move — this is the whole trick.
              setY(clamp(e.clientY - trackTop - grabOffsetRef.current));
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
              <p className="text-sm text-foreground">Drag me anywhere</p>
              <p className="text-xs text-muted-foreground">I stay glued to your finger</p>
            </div>
          </div>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs" aria-live="polite">
          <div>
            <dt className="text-muted-foreground">grab offset</dt>
            <dd className="font-mono text-foreground">
              {grabOffset === null ? '—' : `${Math.round(grabOffset)}px from top`}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">teleport on grab</dt>
            <dd className="font-mono text-success">{Math.round(jump)}px</dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">
          {dragging
            ? 'The point you grabbed is still under your pointer.'
            : 'Grab it low, grab it high — the offset changes, the teleport stays at 0px.'}
        </p>
      </div>
      <p className="text-xs text-success mt-4">
        grabOffset = e.clientY − rect.top at pointerdown, subtracted on every move — no teleport
      </p>
    </div>
  );
}
