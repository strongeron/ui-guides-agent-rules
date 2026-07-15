import { useEffect, useState } from 'react';

/**
 * The same scene inside budget: pixel ratio capped at 2 (above which the extra density
 * is imperceptible and only expensive), geometry instanced into one draw call, and GPU
 * resources disposed on unmount. Compare the live multiplier to the uncapped version.
 */
export function WebglGpuBudgetGood() {
  const [dpr, setDpr] = useState(1);
  useEffect(() => setDpr(window.devicePixelRatio || 1), []);
  const capped = Math.min(dpr, 2);
  const factor = (capped * capped).toFixed(2);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg border border-border bg-card p-4">
        <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs text-foreground">
          <code>{`renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
)
// merged / instanced → 1 draw call
useEffect(() => () => {
  geometry.dispose(); material.dispose()
}, [])`}</code>
        </pre>
        <p className="mt-3 font-mono text-xs text-success">
          Your screen: dpr {dpr} → capped to {capped}, shading {factor}× the pixel area
        </p>
      </div>
      <p className="mt-4 text-xs text-success">
        Ratio capped, geometry instanced to one draw call, GPU memory freed on unmount.
      </p>
    </div>
  );
}
