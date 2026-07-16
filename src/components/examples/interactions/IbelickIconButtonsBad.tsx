import { ScreenReaderSim } from '@/components/ScreenReaderSim';

const buttonClass =
  'p-2 rounded-lg bg-muted hover:bg-muted/80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

export function IbelickIconButtonsBad() {
  return (
    <div className="space-y-4">
      <ScreenReaderSim>
        <div className="flex gap-2">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button className={buttonClass}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button className={buttonClass}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button className={buttonClass}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </ScreenReaderSim>
      <p className="text-xs text-destructive">
        No <code>aria-label</code> and no text — each button announces only as “button”, with no purpose.
      </p>
    </div>
  );
}
