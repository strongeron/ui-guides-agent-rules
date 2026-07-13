import { useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';

export function IbelickReducedMotionBad() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <ReducedMotionSwitch />
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm transition-colors duration-150 ease-out hover:bg-primary/90"
        >
          {open ? 'Hide menu' : 'Show menu'}
        </button>
        <span
          className="inline-block size-6 rounded-full border-4 border-primary border-t-transparent"
          style={{ animation: 'rmSpin 0.8s linear infinite' }}
        />
      </div>
      {open && (
        <div className="rounded-lg bg-muted p-3 text-sm" style={{ animation: 'rmBounce 500ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          Bouncy menu
        </div>
      )}
      <style>{`
        @keyframes rmSpin { to { transform: rotate(360deg); } }
        @keyframes rmBounce { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <p className="text-xs text-destructive">
        The bounce-in menu and the spinner both ignore reduce-motion — jarring for vestibular-sensitive users
      </p>
    </div>
  );
}
