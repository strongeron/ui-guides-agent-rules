import { useState } from 'react';

export function TogglesImmediateEffectGood() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-medium text-foreground">Settings</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Notifications</span>
          <button
            role="switch"
            aria-checked={notifications}
            onClick={() => setNotifications(!notifications)}
            className={`w-10 h-6 rounded-full transition-colors relative ${
              notifications ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                notifications ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Dark Mode</span>
          <button
            role="switch"
            aria-checked={darkMode}
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-6 rounded-full transition-colors relative ${
              darkMode ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                darkMode ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      <p className="text-xs text-success">
        Toggles take effect immediately — no save needed
      </p>
    </div>
  );
}
