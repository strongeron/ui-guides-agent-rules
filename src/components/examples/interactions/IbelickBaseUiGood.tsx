import { useState } from 'react';

export function IbelickBaseUiGood() {
  const [value, setValue] = useState(50);

  // Note: In production, use Base UI Slider:
  // import { Slider } from '@base_ui/react/Slider';
  // <Slider.Root value={value} onValueChange={setValue}>
  //   <Slider.Track><Slider.Indicator /><Slider.Thumb /></Slider.Track>
  // </Slider.Root>

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="base-slider" className="text-sm font-medium">Base UI slider:</label>
        <input
          id="base-slider"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
        />
        <p className="text-xs text-muted-foreground">Value: {value}</p>
      </div>
      <p className="text-xs text-success">
        Base UI Slider: keyboard arrows, ARIA, touch support, RTL ready
      </p>
    </div>
  );
}
