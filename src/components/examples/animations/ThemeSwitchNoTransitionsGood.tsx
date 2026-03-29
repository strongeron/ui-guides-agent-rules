import { useState, useRef, useCallback } from 'react';

export function ThemeSwitchNoTransitionsGood() {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTheme = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      el.style.setProperty('--transition-duration', '0s');
      setIsDark(prev => !prev);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.removeProperty('--transition-duration');
        });
      });
    }
  }, []);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div
        ref={containerRef}
        className="rounded-lg p-4 space-y-3"
        style={{
          background: isDark ? '#1a1a2e' : '#ffffff',
          border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
          color: isDark ? '#e5e5e5' : '#1a1a2e',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme Toggle</span>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded text-sm"
            style={{
              background: isDark ? '#6366f1' : '#e5e5e5',
              color: isDark ? '#fff' : '#1a1a2e',
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div className="rounded px-3 py-2 text-sm" style={{ background: isDark ? '#252547' : '#f5f5f5' }}>
          Card element
        </div>
        <div className="rounded px-3 py-2 text-sm" style={{ background: isDark ? '#252547' : '#f5f5f5' }}>
          Another element
        </div>
      </div>
      <p className="text-xs text-success">Transitions disabled during theme switch — instant, clean change</p>
    </div>
  );
}
