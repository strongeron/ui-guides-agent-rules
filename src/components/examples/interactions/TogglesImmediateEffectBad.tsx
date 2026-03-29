import { useState } from 'react';

export function TogglesImmediateEffectBad() {
  const [pendingNotifications, setPendingNotifications] = useState(false);
  const [pendingDarkMode, setPendingDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-medium text-foreground">Settings</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Notifications</span>
          <button
            onClick={() => {
              setPendingNotifications(!pendingNotifications);
              setSaved(false);
            }}
            className={`w-10 h-6 rounded-full transition-colors relative ${
              pendingNotifications ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                pendingNotifications ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Dark Mode</span>
          <button
            onClick={() => {
              setPendingDarkMode(!pendingDarkMode);
              setSaved(false);
            }}
            className={`w-10 h-6 rounded-full transition-colors relative ${
              pendingDarkMode ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                pendingDarkMode ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <button
          onClick={() => setSaved(true)}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>
      <p className="text-xs text-error">
        Toggles require pressing Save — adds unnecessary friction
      </p>
    </div>
  );
}
