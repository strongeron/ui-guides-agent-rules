export function IbelickNoGlowBad() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
          style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)',
          }}
        >
          Primary Action
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-muted text-sm"
          style={{
            boxShadow: '0 0 15px rgba(100, 100, 100, 0.4)',
          }}
        >
          Secondary
        </button>
      </div>
      <p className="text-xs text-destructive">
        Glow effects as affordance - hard to see in bright light, unclear hierarchy
      </p>
    </div>
  );
}
