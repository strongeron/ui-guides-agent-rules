import { useState } from 'react';
import { ReducedMotionSwitch } from '@/components/demo-kit/ReducedMotionSwitch';
import { useSimulatedReducedMotion } from '@/hooks/useSimulatedReducedMotion';

export function IbelickReducedMotionGood() {
  const reduced = useSimulatedReducedMotion();
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
        {reduced ? (
          <span className="inline-block size-6 rounded-full bg-primary" style={{ animation: 'rmPulse 1.4s ease-in-out infinite' }} />
        ) : (
          <span
            className="inline-block size-6 rounded-full border-4 border-primary border-t-transparent"
            style={{ animation: 'rmSpin 0.8s linear infinite' }}
          />
        )}
      </div>
      {open && (
        <div
          className="rounded-lg bg-muted p-3 text-sm"
          style={{ animation: reduced ? 'rmFade 200ms ease-out' : 'rmBounce 500ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          {reduced ? 'Calm menu' : 'Bouncy menu'}
        </div>
      )}
      <style>{`
        @keyframes rmSpin { to { transform: rotate(360deg); } }
        @keyframes rmBounce { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
        @keyframes rmFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rmPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
      <p className="text-xs text-success">
        With reduce-motion on: the menu just fades (no bounce) and the spinner becomes a gentle pulsing dot — both scenarios handled
      </p>
    </div>
  );
}
