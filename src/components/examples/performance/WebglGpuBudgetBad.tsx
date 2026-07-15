import { useEffect, useState } from 'react';

/**
 * The three classic WebGL budget mistakes at once: an uncapped pixel ratio (quadratic
 * fragment cost on retina/mobile), one draw call per object, and no disposal on unmount.
 * The live line shows the pixel-area multiplier on the viewer's own screen.
 */
export function WebglGpuBudgetBad() {
  const [dpr, setDpr] = useState(1);
  useEffect(() => setDpr(window.devicePixelRatio || 1), []);
  const factor = (dpr * dpr).toFixed(2);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs text-foreground">
          <code>{`renderer.setPixelRatio(
  window.devicePixelRatio   // uncapped
)
// 400 separate meshes → 400 draw calls
// geometry/material/texture never disposed`}</code>
        </pre>
        <p className="mt-3 font-mono text-xs text-destructive">
          Your screen: dpr {dpr} → shading {factor}× the pixel area
        </p>
      </div>
      <p className="mt-4 text-xs text-destructive">
        Uncapped ratio + hundreds of draw calls + no disposal — the reliable way to melt a mid-range phone.
      </p>
    </div>
  );
}
