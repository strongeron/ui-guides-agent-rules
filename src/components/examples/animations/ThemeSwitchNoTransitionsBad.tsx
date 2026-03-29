import { useState } from 'react';

export function ThemeSwitchNoTransitionsBad() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div
        className="rounded-lg p-4 space-y-3 transition-all duration-500"
        style={{
          background: isDark ? '#1a1a2e' : '#ffffff',
          border: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
          color: isDark ? '#e5e5e5' : '#1a1a2e',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme Toggle</span>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-3 py-1 rounded text-sm transition-all duration-500"
            style={{
              background: isDark ? '#6366f1' : '#e5e5e5',
              color: isDark ? '#fff' : '#1a1a2e',
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div className="transition-all duration-500 rounded px-3 py-2 text-sm" style={{ background: isDark ? '#252547' : '#f5f5f5' }}>
          Card element
        </div>
        <div className="transition-all duration-500 rounded px-3 py-2 text-sm" style={{ background: isDark ? '#252547' : '#f5f5f5' }}>
          Another element
        </div>
      </div>
      <p className="text-xs text-error">All elements visibly transition during theme switch — distracting</p>
    </div>
  );
}
